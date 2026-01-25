import { NextResponse } from "next/server";
import { Readable } from "node:stream";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export const runtime = "nodejs";

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (ch) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[ch] ?? ch;
  });
}

function isValidEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

function safeErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return "Erreur inconnue";
  }
}

async function readBodyUtf8(req: Request) {
  // Tentative standard (Web Request)
  try {
    return await req.text();
  } catch (err) {
    console.error("req.text() failed, fallback to stream:", err);

    // Fallback Node: lire req.body comme stream
    if (!req.body) {
      throw new Error("Request body indisponible (req.body null).");
    }

    const nodeStream = Readable.fromWeb(req.body as any);
    const chunks: Buffer[] = [];

    for await (const chunk of nodeStream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      // petit garde-fou anti spam
      const size = chunks.reduce((s, b) => s + b.length, 0);
      if (size > 200_000) throw new Error("Payload trop volumineux.");
    }

    return Buffer.concat(chunks).toString("utf8");
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json(
        { ok: false, error: "Configuration email manquante (env vars)." },
        { status: 500 },
      );
    }

    let rawBody = "";
    try {
      rawBody = await readBodyUtf8(req);
    } catch (err) {
      console.error("Body read error:", err);
      return NextResponse.json(
        { ok: false, error: safeErrorMessage(err), meta: { contentType } },
        { status: 400 },
      );
    }

    if (!rawBody) {
      return NextResponse.json(
        { ok: false, error: "Body vide.", meta: { contentType } },
        { status: 400 },
      );
    }

    let data: ContactPayload;
    try {
      data = JSON.parse(rawBody) as ContactPayload;
    } catch (err) {
      console.error("Invalid JSON payload:", {
        contentType,
        rawLength: rawBody.length,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Invalid JSON",
          meta: { contentType, rawLength: rawBody.length },
        },
        { status: 400 },
      );
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const subject = (data.subject || "").trim();
    const message = (data.message || "").trim();

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Email et message sont requis." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Email invalide." },
        { status: 400 },
      );
    }

    if (
      name.length > 120 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { ok: false, error: "Champs trop longs." },
        { status: 400 },
      );
    }

    const finalSubject = subject
      ? `Contact justinallard.ca: ${subject}`
      : "Contact justinallard.ca: Nouveau message";

    const text = [
      "Nouveau message via justinallard.ca",
      "",
      `Nom: ${name || "—"}`,
      `Email: ${email}`,
      `Sujet: ${subject || "—"}`,
      "",
      "Message:",
      message,
      "",
    ].join("\n");

    const html = `
      <h2>Nouveau message via justinallard.ca</h2>
      <p><strong>Nom:</strong> ${escapeHtml(name || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Sujet:</strong> ${escapeHtml(subject || "—")}</p>
      <hr />
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
${escapeHtml(message)}
      </pre>
    `;

    // ✅ import dynamique pour capturer un crash d’import/module
    let ResendCtor: any;
    try {
      const mod = await import("resend");
      ResendCtor = mod.Resend;
    } catch (err) {
      console.error("Resend import error:", err);
      return NextResponse.json(
        { ok: false, error: "Échec de chargement du module Resend." },
        { status: 500 },
      );
    }

    const resend = new ResendCtor(apiKey);

    try {
      const { data: sent, error } = await resend.emails.send({
        from,
        to: [to],
        subject: finalSubject,
        replyTo: email,
        text,
        html,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { ok: false, error: error.message ?? "Échec d’envoi email." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true, id: sent?.id });
    } catch (err) {
      console.error("Resend send error:", err);
      return NextResponse.json(
        { ok: false, error: safeErrorMessage(err) },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Contact API fatal error:", err);
    return NextResponse.json(
      { ok: false, error: safeErrorMessage(err) },
      { status: 500 },
    );
  }
}
