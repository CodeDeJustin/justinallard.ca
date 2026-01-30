/* import-medium.cjs
   One-shot importer: Medium HTML export -> content/blogs/<slug> (index.mdx + metadata.json)
   + downloads featured image to public/images/blogs/<slug>/landing.<ext>

   Usage examples:
     node .\import-medium.cjs --help
     node .\import-medium.cjs --dry-run --onlyIds ab31e8495e7a,79e71e77d7ae
     node .\import-medium.cjs --onlyIds ab31e8495e7a
*/

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const https = require("https");

const cheerio = require("cheerio");
const TurndownService = require("turndown");

function hasArg(name) {
  return process.argv.includes(name);
}
function getArg(name, fallback) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  const v = process.argv[idx + 1];
  if (!v || v.startsWith("--")) return fallback;
  return v;
}

function printHelp() {
  console.log(`
import-medium.cjs

Options:
  --exportDir   Path to unzipped Medium export (default: C:\\Dev\\medium-export\\unzipped)
  --postsDir    Path to posts folder (default: <exportDir>\\posts)
  --contentDir  Output root for MDX (default: <repo>\\content\\blogs)
  --publicDir   Output root for images (default: <repo>\\public\\images\\blogs)
  --onlyIds     Comma-separated Medium IDs to import (matches filenames) e.g. ab31e8495e7a,79e71e77d7ae
  --dry-run     Print what would be done, without writing files

Examples:
  node .\\import-medium.cjs --dry-run --onlyIds ab31e8495e7a
  node .\\import-medium.cjs --onlyIds ab31e8495e7a,79e71e77d7ae
`);
}

function slugifyFromCanonical(canonicalUrl) {
  // canonical looks like: https://medium.com/@justinallard/<slug-with-id>
  // We remove diacritics (é -> e), keep id at end, and normalize to a folder-safe slug.
  try {
    const u = new URL(canonicalUrl);
    let p = u.pathname || "";
    // remove leading "/@user/"
    p = p.replace(/^\/@[^/]+\//, "");
    p = decodeURIComponent(p);

    // remove diacritics
    p = p.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

    // normalize
    p = p
      .toLowerCase()
      .replace(/['’]/g, "") // drop apostrophes
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return p || null;
  } catch {
    return null;
  }
}

function firstNonEmpty(...vals) {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function fetchBuffer(url) {
  if (globalThis.fetch) {
    return fetch(url).then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      const ct = res.headers.get("content-type") || "";
      const ab = await res.arrayBuffer();
      return { buf: Buffer.from(ab), contentType: ct };
    });
  }

  // fallback (older Node)
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const ct = res.headers["content-type"] || "";
        const chunks = [];
        res.on("data", (d) => chunks.push(d));
        res.on("end", () =>
          resolve({ buf: Buffer.concat(chunks), contentType: String(ct) }),
        );
      })
      .on("error", reject);
  });
}

function extFromContentType(ct) {
  const s = (ct || "").toLowerCase();
  if (s.includes("image/png")) return ".png";
  if (s.includes("image/webp")) return ".webp";
  if (s.includes("image/jpeg") || s.includes("image/jpg")) return ".jpg";
  if (s.includes("image/gif")) return ".gif";
  return "";
}

async function main() {
  if (hasArg("--help") || hasArg("-h")) {
    printHelp();
    return;
  }

  const dryRun = hasArg("--dry-run");

  const exportDir = getArg("--exportDir", "C:\\Dev\\medium-export\\unzipped");
  const postsDir = getArg("--postsDir", path.join(exportDir, "posts"));
  const contentDir = getArg(
    "--contentDir",
    path.join(process.cwd(), "content", "blogs"),
  );
  const publicDir = getArg(
    "--publicDir",
    path.join(process.cwd(), "public", "images", "blogs"),
  );

  const onlyIdsRaw = getArg("--onlyIds", "");
  const onlyIds = onlyIdsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!fs.existsSync(postsDir)) {
    throw new Error(`postsDir not found: ${postsDir}`);
  }

  const allFiles = await fsp.readdir(postsDir);
  let htmlFiles = allFiles.filter((f) => f.toLowerCase().endsWith(".html"));

  if (onlyIds.length) {
    htmlFiles = htmlFiles.filter((f) => onlyIds.some((id) => f.includes(id)));
  }

  if (!htmlFiles.length) {
    console.log("No post HTML files matched your filters.");
    return;
  }

  console.log(`Found ${htmlFiles.length} post(s) to import.`);
  console.log(`postsDir:   ${postsDir}`);
  console.log(`contentDir: ${contentDir}`);
  console.log(`publicDir:  ${publicDir}`);
  if (dryRun) console.log("DRY RUN (no files will be written).");

  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "_",
  });

  // Better figure handling: keep image + caption.
  turndown.addRule("figure", {
    filter: "figure",
    replacement: function (content, node) {
      const img = node.querySelector("img");
      if (!img) return content || "";
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";
      const capEl = node.querySelector("figcaption");
      const cap = capEl ? capEl.textContent.trim() : "";
      let out = `![${alt.replace(/\s+/g, " ").trim()}](${src})`;
      if (cap) out += `\n\n_${cap}_`;
      return `\n\n${out}\n\n`;
    },
  });

  // Keep <br> as newlines
  turndown.addRule("br", {
    filter: "br",
    replacement: () => "\n",
  });

  for (const fileName of htmlFiles) {
    const abs = path.join(postsDir, fileName);
    const html = await fsp.readFile(abs, "utf8");
    const $ = cheerio.load(html, { decodeEntities: false });

    const title = firstNonEmpty($("h1.p-name").first().text());
    const canonicalUrl = $("a.p-canonical").attr("href")?.trim() || "";
    const slug =
      slugifyFromCanonical(canonicalUrl) ||
      fileName
        .replace(/^\d{4}-\d{2}-\d{2}_/, "")
        .replace(/\.html$/i, "")
        .toLowerCase();

    const dt = $("time.dt-published").attr("datetime")?.trim() || "";
    const date = dt ? dt.slice(0, 10) : "";

    const subtitle = firstNonEmpty($('section[data-field="subtitle"]').text());
    const firstPara = firstNonEmpty($("p.graf--p").first().text());
    const description = firstNonEmpty(subtitle, firstPara)
      .replace(/\s+/g, " ")
      .trim();

    // featured image (used by BlogLayout header)
    const featuredImgEl = $('img[data-is-featured="true"]').first();
    const featuredImgUrl = featuredImgEl.attr("src")?.trim() || "";

    // Remove duplicate title inside body (Medium export repeats it as graf--title)
    $(".graf--title").each((_, el) => {
      const t = $(el).text().trim().toLowerCase();
      if (title && t === title.trim().toLowerCase()) $(el).remove();
    });

    // Remove featured figure from body so it doesn't duplicate the header image
    if (featuredImgUrl) {
      $('img[data-is-featured="true"]').each((_, el) => {
        $(el).closest("figure").remove();
      });
    }

    // Extract body sections only (exclude header/footer)
    const bodySections = $("article.h-entry").find("section.section--body");
    let bodyHtml = "";
    bodySections.each((_, sec) => {
      // Keep content in reading order
      bodyHtml += $(sec)
        .find(".section-inner")
        .toArray()
        .map((x) => $(x).html() || "")
        .join("\n");
      bodyHtml += "\n";
    });

    let mdx = turndown.turndown(bodyHtml || "");
    mdx = mdx.replace(/\n{3,}/g, "\n\n").trim() + "\n";

    // Prepare output paths
    const outPostDir = path.join(contentDir, slug);
    const outMdxPath = path.join(outPostDir, "index.mdx");
    const outMetaPath = path.join(outPostDir, "metadata.json");

    const meta = {
      author: "Justin Allard",
      date,
      title: title || slug,
      description,
      image: "", // filled only if we successfully download featured image
      canonicalUrl: canonicalUrl || undefined,
    };

    console.log(`\n[${slug}]`);
    console.log(`  title: ${meta.title}`);
    console.log(`  date:  ${meta.date}`);
    console.log(`  hero:  ${featuredImgUrl || "(none)"}`);
    console.log(`  from:  ${fileName}`);

    // Download featured image (if any)
    if (featuredImgUrl) {
      const imgOutDir = path.join(publicDir, slug);
      let imgExt = path.extname(new URL(featuredImgUrl).pathname || "");
      if (!imgExt) imgExt = ""; // will infer from content-type

      const imgNameBase = "landing";
      let finalFileName = imgNameBase + imgExt;

      try {
        if (dryRun) {
          console.log(
            `  would download -> ${path.join(imgOutDir, finalFileName)}`,
          );
          meta.image = `/images/blogs/${slug}/${finalFileName}`;
        } else {
          await fsp.mkdir(imgOutDir, { recursive: true });
          const { buf, contentType } = await fetchBuffer(featuredImgUrl);
          if (!imgExt) {
            imgExt = extFromContentType(contentType) || ".jpg";
            finalFileName = imgNameBase + imgExt;
          }
          const imgPath = path.join(imgOutDir, finalFileName);
          await fsp.writeFile(imgPath, buf);
          meta.image = `/images/blogs/${slug}/${finalFileName}`;
          console.log(`  downloaded -> ${imgPath}`);
        }
      } catch (err) {
        console.log(
          `  WARNING: failed to download hero image, will omit meta.image. (${err.message})`,
        );
        meta.image = "";
      }
    }

    // Write outputs
    if (dryRun) {
      console.log(`  would write -> ${outMdxPath}`);
      console.log(`  would write -> ${outMetaPath}`);
      continue;
    }

    await fsp.mkdir(outPostDir, { recursive: true });
    await fsp.writeFile(outMdxPath, mdx, "utf8");

    // Remove empty fields for cleanliness
    const metaClean = { ...meta };
    if (!metaClean.image) delete metaClean.image;
    if (!metaClean.canonicalUrl) delete metaClean.canonicalUrl;

    await fsp.writeFile(
      outMetaPath,
      JSON.stringify(metaClean, null, 2) + "\n",
      "utf8",
    );
    console.log(`  wrote -> ${outPostDir}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nERROR:", err.message || err);
  process.exitCode = 1;
});
