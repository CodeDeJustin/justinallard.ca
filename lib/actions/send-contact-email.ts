"use server";

import { Resend } from "resend";

export type ContactActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: string };

const initial: ContactActionState = { status: "idle" };

function safeStr(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function isValidEmail(value: string) {
  // Simple et suffisant pour un formulaire de contact
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  return "Erreur serveur.";
}

export async function sendContact(
  _prevState: ContactActionState = initial,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return {
        status: "error",
        error: "Configuration email manquante (RESEND_API_KEY / CONTACT_*).",
      };
    }

    // Honeypot anti-spam: les humains ne remplissent pas ça
    const company = safeStr(formData.get("company"));
    if (company) return { status: "success" };

    const name = safeStr(formData.get("name"));
    const email = safeStr(formData.get("email"));
    const subjectRaw = safeStr(formData.get("subject"));
    const message = safeStr(formData.get("message"));

    if (!email || !message) {
      return { status: "error", error: "Email et message sont requis." };
    }
    if (!isValidEmail(email)) {
      return { status: "error", error: "Email invalide." };
    }

    // Garde-fous
    if (
      name.length > 120 ||
      subjectRaw.length > 200 ||
      message.length > 5000 ||
      email.length > 254
    ) {
      return {
        status: "error",
        error: "Un ou plusieurs champs sont trop longs.",
      };
    }

    const subject = subjectRaw
      ? `Contact justinallard.ca: ${subjectRaw}`
      : "Contact justinallard.ca: Nouveau message";

    const text = [
      "Nouveau message via justinallard.ca",
      "",
      `Nom: ${name || "—"}`,
      `Email: ${email}`,
      `Sujet: ${subjectRaw || "—"}`,
      "",
      "Message:",
      message,
      "",
    ].join("\n");

    const html = `
      <h2>Nouveau message via justinallard.ca</h2>
      <p><strong>Nom:</strong> ${escapeHtml(name || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Sujet:</strong> ${escapeHtml(subjectRaw || "—")}</p>
      <hr />
      <pre style="white-space:pre-wrap;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">${escapeHtml(message)}</pre>
    `;

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "error",
        error: error.message || "Échec d’envoi email.",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("Contact action fatal:", err);
    return { status: "error", error: safeErrorMessage(err) };
  }
}
