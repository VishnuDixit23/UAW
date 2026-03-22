/**
 * ═══════════════════════════════════════════════════════════════
 *  UAW Gallery Manager — Local Development Tool
 *  ─────────────────────────────────────────────────────────────
 *  Run:   node gallery-manager.js
 *  Open:  http://localhost:4444
 *
 *  Features:
 *  • Browse & select photos/videos from your machine
 *  • Upload them to the correct public/gallery/<category>/ folder
 *  • Auto-updates Gallery.jsx with the new image entries
 *  • Drag & drop support
 *  • Add captions before uploading
 * ═══════════════════════════════════════════════════════════════
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4444;
const GALLERY_DIR = path.join(__dirname, "public", "gallery");
const GALLERY_JSX = path.join(__dirname, "src", "pages", "Gallery.jsx");

// ── Helpers ──────────────────────────────────────────────────

function getCategories() {
  const content = fs.readFileSync(GALLERY_JSX, "utf-8");
  const match = content.match(
    /const GALLERY_CATEGORIES\s*=\s*\[([\s\S]*?)\n\];/
  );
  if (!match) return [];

  const categories = [];
  const catRegex =
    /\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*description:\s*"([^"]*)"(?:[\s\S]*?)icon:\s*"([^"]*)"(?:[\s\S]*?)date:\s*"([^"]*)"(?:[\s\S]*?)coverImage:\s*([^,]+),\s*images:\s*\[([\s\S]*?)\],?\s*\}/g;

  let m;
  while ((m = catRegex.exec(match[1])) !== null) {
    const id = m[1];
    const title = m[2];
    const description = m[3];
    const icon = m[4];
    const date = m[5];
    const coverImage = m[6].trim().replace(/"/g, "").replace(/'/g, "");

    const images = [];
    const imgRegex =
      /\{\s*src:\s*"([^"]+)",\s*caption:\s*"([^"]*)"\s*\}/g;
    let im;
    while ((im = imgRegex.exec(m[7])) !== null) {
      images.push({ src: im[1], caption: im[2] });
    }

    const catDir = path.join(GALLERY_DIR, id);
    let existingFiles = [];
    if (fs.existsSync(catDir)) {
      existingFiles = fs
        .readdirSync(catDir)
        .filter((f) =>
          /\.(jpg|jpeg|png|gif|webp|mp4|mov|avi|webm)$/i.test(f)
        );
    }

    categories.push({
      id, title, description, icon, date,
      coverImage: coverImage === "null" ? null : coverImage,
      images, existingFiles,
    });
  }

  return categories;
}

function updateGalleryJSX(categoryId, newImages) {
  let content = fs.readFileSync(GALLERY_JSX, "utf-8");

  const catRegex = new RegExp(
    `(\\{\\s*id:\\s*"${categoryId}"[\\s\\S]*?images:\\s*\\[)[\\s\\S]*?(\\],?\\s*\\})`,
    "m"
  );

  const match = content.match(catRegex);
  if (!match) {
    console.error('Could not find category "' + categoryId + '" in Gallery.jsx');
    return false;
  }

  const imagesStr = newImages
    .map(
      (img) =>
        '\n      { src: "' + img.src + '", caption: "' + img.caption.replace(/"/g, '\\"') + '" }'
    )
    .join(",");

  const newBlock = match[1] + imagesStr + "\n    " + match[2];
  content = content.replace(catRegex, newBlock);

  if (newImages.length > 0) {
    const coverRegex = new RegExp(
      `(id:\\s*"${categoryId}"[\\s\\S]*?coverImage:\\s*)[^,]+`,
      "m"
    );
    content = content.replace(coverRegex, '$1"' + newImages[0].src + '"');
  }

  fs.writeFileSync(GALLERY_JSX, content, "utf-8");
  return true;
}

function parseMultipart(buffer, boundary) {
  const files = [];
  const fields = {};

  const boundaryBuffer = Buffer.from("--" + boundary);
  const parts = [];
  let start = buffer.indexOf(boundaryBuffer);

  while (start !== -1) {
    const nextStart = buffer.indexOf(
      boundaryBuffer,
      start + boundaryBuffer.length
    );
    if (nextStart === -1) break;
    parts.push(buffer.slice(start + boundaryBuffer.length, nextStart));
    start = nextStart;
  }

  for (const part of parts) {
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;

    const header = part.slice(0, headerEnd).toString();
    const body = part.slice(headerEnd + 4, part.length - 2);

    const nameMatch = header.match(/name="([^"]+)"/);
    const filenameMatch = header.match(/filename="([^"]+)"/);

    if (!nameMatch) continue;

    if (filenameMatch) {
      files.push({
        fieldname: nameMatch[1],
        filename: filenameMatch[1],
        data: body,
      });
    } else {
      fields[nameMatch[1]] = body.toString().trim();
    }
  }

  return { files, fields };
}

// ── HTML Generator ──────────────────────────────────────────

function getHTML() {
  const categories = getCategories();

  // Build category cards HTML server-side
  let cardsHTML = "";
  for (const cat of categories) {
    cardsHTML += '<div class="cat-card" data-id="' + cat.id + '" onclick="selectCategory(\'' + cat.id + '\')">';
    cardsHTML += '<div class="cat-card__header">';
    cardsHTML += '<div class="cat-card__icon">' + cat.icon + '</div>';
    cardsHTML += '<div class="cat-card__title">' + cat.title + '</div>';
    cardsHTML += '</div>';
    cardsHTML += '<div class="cat-card__desc">' + cat.description + '</div>';
    cardsHTML += '<div class="cat-card__stats">';
    cardsHTML += '<span class="cat-card__stat cat-card__stat--count">📷 ' + cat.images.length + ' photos</span>';
    cardsHTML += '<span class="cat-card__stat">📁 ' + cat.existingFiles.length + ' files</span>';
    cardsHTML += '</div>';
    cardsHTML += '</div>';
  }

  // Build the complete HTML using string concatenation (no template literals)
  // to avoid escaping issues with client-side JS template literals
  const html = '<!DOCTYPE html>\n'
+ '<html lang="en">\n'
+ '<head>\n'
+ '  <meta charset="UTF-8">\n'
+ '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
+ '  <title>UAW Gallery Manager</title>\n'
+ '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">\n'
+ '  <style>\n'
+ '    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n'
+ '    :root {\n'
+ '      --bg: #0F0F14; --surface: #1A1A24; --surface-hover: #22222E;\n'
+ '      --border: #2A2A38; --text: #E8E8F0; --text-muted: #8888A0;\n'
+ '      --accent: #F3842C; --accent-glow: rgba(243,132,44,0.15); --accent-dark: #D4721E;\n'
+ '      --success: #22C55E; --success-bg: rgba(34,197,94,0.12);\n'
+ '      --danger: #EF4444; --radius: 16px; --radius-sm: 10px;\n'
+ '    }\n'
+ '    body { font-family: "Inter",-apple-system,BlinkMacSystemFont,sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; line-height: 1.6; }\n'
+ '    .header { padding: 32px 40px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 20px; background: linear-gradient(180deg, rgba(243,132,44,0.04) 0%, transparent 100%); }\n'
+ '    .header__icon { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, var(--accent), var(--accent-dark)); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 0 4px 20px rgba(243,132,44,0.3); }\n'
+ '    .header h1 { font-family: "Outfit",sans-serif; font-size: 1.8rem; font-weight: 700; background: linear-gradient(135deg, #fff 30%, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n'
+ '    .header p { font-size: 0.88rem; color: var(--text-muted); margin-top: 2px; }\n'
+ '    .container { max-width: 1200px; margin: 0 auto; padding: 40px; }\n'
+ '    .section-title { font-family: "Outfit",sans-serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: var(--text); }\n'
+ '    .section-desc { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 28px; }\n'
+ '    .categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 48px; }\n'
+ '    .cat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; }\n'
+ '    .cat-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), #FF6B35); opacity: 0; transition: opacity 0.3s; }\n'
+ '    .cat-card:hover { border-color: rgba(243,132,44,0.3); background: var(--surface-hover); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(243,132,44,0.1); }\n'
+ '    .cat-card:hover::before { opacity: 1; }\n'
+ '    .cat-card.active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 8px 32px rgba(243,132,44,0.15); }\n'
+ '    .cat-card.active::before { opacity: 1; }\n'
+ '    .cat-card__header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }\n'
+ '    .cat-card__icon { font-size: 2rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: rgba(255,255,255,0.05); flex-shrink: 0; }\n'
+ '    .cat-card__title { font-family: "Outfit",sans-serif; font-size: 1.1rem; font-weight: 700; line-height: 1.25; }\n'
+ '    .cat-card__desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n'
+ '    .cat-card__stats { display: flex; gap: 12px; }\n'
+ '    .cat-card__stat { font-size: 0.72rem; font-weight: 600; padding: 4px 12px; border-radius: 99px; background: rgba(255,255,255,0.05); color: var(--text-muted); }\n'
+ '    .cat-card__stat--count { background: var(--accent-glow); color: var(--accent); }\n'
+ '    .upload-panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; display: none; animation: slideUp 0.4s ease; }\n'
+ '    .upload-panel.visible { display: block; }\n'
+ '    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }\n'
+ '    .upload-panel__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }\n'
+ '    .upload-panel__title { font-family: "Outfit",sans-serif; font-size: 1.35rem; font-weight: 700; display: flex; align-items: center; gap: 12px; }\n'
+ '    .upload-panel__title span { font-size: 1.5rem; }\n'
+ '    .btn { font-family: "Inter",sans-serif; font-size: 0.85rem; font-weight: 600; padding: 10px 22px; border-radius: var(--radius-sm); border: none; cursor: pointer; transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px; }\n'
+ '    .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent-dark)); color: white; box-shadow: 0 4px 16px rgba(243,132,44,0.3); }\n'
+ '    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(243,132,44,0.4); }\n'
+ '    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }\n'
+ '    .btn-ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }\n'
+ '    .btn-ghost:hover { background: var(--surface-hover); color: var(--text); border-color: var(--text-muted); }\n'
+ '    .drop-zone { border: 2px dashed var(--border); border-radius: var(--radius); padding: 48px 32px; text-align: center; transition: all 0.3s; cursor: pointer; margin-bottom: 28px; position: relative; }\n'
+ '    .drop-zone:hover, .drop-zone.dragover { border-color: var(--accent); background: var(--accent-glow); }\n'
+ '    .drop-zone.dragover { transform: scale(1.01); }\n'
+ '    .drop-zone__icon { font-size: 3rem; margin-bottom: 12px; display: block; }\n'
+ '    .drop-zone__text { font-size: 1rem; font-weight: 600; color: var(--text); margin-bottom: 6px; }\n'
+ '    .drop-zone__sub { font-size: 0.82rem; color: var(--text-muted); }\n'
+ '    .drop-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }\n'
+ '    .file-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }\n'
+ '    .file-item { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px 18px; animation: fadeIn 0.3s ease; }\n'
+ '    @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }\n'
+ '    .file-item__preview { width: 64px; height: 48px; border-radius: 8px; overflow: hidden; background: var(--surface); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }\n'
+ '    .file-item__preview img, .file-item__preview video { width: 100%; height: 100%; object-fit: cover; }\n'
+ '    .file-item__info { flex: 1; min-width: 0; }\n'
+ '    .file-item__name { font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }\n'
+ '    .file-item__size { font-size: 0.72rem; color: var(--text-muted); }\n'
+ '    .file-item__caption { flex: 1; min-width: 180px; }\n'
+ '    .file-item__caption input { width: 100%; font-family: "Inter",sans-serif; font-size: 0.82rem; padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); color: var(--text); outline: none; transition: border-color 0.2s; }\n'
+ '    .file-item__caption input:focus { border-color: var(--accent); }\n'
+ '    .file-item__caption input::placeholder { color: var(--text-muted); }\n'
+ '    .file-item__remove { width: 36px; height: 36px; border-radius: 8px; border: 1px solid rgba(239,68,68,0.2); background: rgba(239,68,68,0.08); color: var(--danger); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; transition: all 0.2s; flex-shrink: 0; }\n'
+ '    .file-item__remove:hover { background: rgba(239,68,68,0.18); }\n'
+ '    .existing-section { margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--border); }\n'
+ '    .existing-title { font-family: "Outfit",sans-serif; font-size: 1.05rem; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }\n'
+ '    .existing-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }\n'
+ '    .existing-item { border-radius: var(--radius-sm); overflow: hidden; aspect-ratio: 4/3; position: relative; border: 1px solid var(--border); transition: all 0.3s; }\n'
+ '    .existing-item:hover { border-color: rgba(239,68,68,0.4); }\n'
+ '    .existing-item img, .existing-item video { width: 100%; height: 100%; object-fit: cover; }\n'
+ '    .existing-item__label { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 20px 8px 6px; font-size: 0.68rem; color: rgba(255,255,255,0.8); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n'
+ '    .existing-item__delete { position: absolute; top: 6px; right: 6px; width: 28px; height: 28px; border-radius: 8px; border: 1px solid rgba(239,68,68,0.4); background: rgba(239,68,68,0.85); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; opacity: 0; transition: all 0.25s; z-index: 2; backdrop-filter: blur(4px); }\n'
+ '    .existing-item:hover .existing-item__delete { opacity: 1; }\n'
+ '    .existing-item__delete:hover { background: rgba(239,68,68,1); transform: scale(1.1); box-shadow: 0 2px 12px rgba(239,68,68,0.5); }\n'
+ '    .confirm-overlay { position: fixed; inset: 0; z-index: 10000; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; }\n'
+ '    .confirm-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; max-width: 420px; width: 90%; text-align: center; animation: slideUp 0.3s ease; }\n'
+ '    .confirm-box__icon { font-size: 2.5rem; margin-bottom: 12px; display: block; }\n'
+ '    .confirm-box__title { font-family: "Outfit",sans-serif; font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }\n'
+ '    .confirm-box__desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px; line-height: 1.6; }\n'
+ '    .confirm-box__actions { display: flex; gap: 12px; justify-content: center; }\n'
+ '    .btn-danger { background: rgba(239,68,68,0.15); color: var(--danger); border: 1px solid rgba(239,68,68,0.3); }\n'
+ '    .btn-danger:hover { background: rgba(239,68,68,0.25); transform: translateY(-2px); }\n'

+ '    .toast { position: fixed; bottom: 32px; right: 32px; padding: 16px 28px; border-radius: var(--radius-sm); font-size: 0.88rem; font-weight: 600; z-index: 9999; animation: toastIn 0.4s ease, toastOut 0.4s ease 2.6s forwards; display: flex; align-items: center; gap: 10px; }\n'
+ '    .toast--success { background: var(--success-bg); color: var(--success); border: 1px solid rgba(34,197,94,0.3); box-shadow: 0 8px 32px rgba(34,197,94,0.15); }\n'
+ '    .toast--error { background: rgba(239,68,68,0.12); color: var(--danger); border: 1px solid rgba(239,68,68,0.3); box-shadow: 0 8px 32px rgba(239,68,68,0.15); }\n'
+ '    @keyframes toastIn { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }\n'
+ '    @keyframes toastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(20px) scale(0.95); } }\n'
+ '    .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; }\n'
+ '    @keyframes spin { to { transform: rotate(360deg); } }\n'
+ '    @media (max-width: 768px) { .container { padding: 20px; } .header { padding: 20px; } .categories-grid { grid-template-columns: 1fr; } .file-item { flex-wrap: wrap; } .file-item__caption { min-width: 100%; } }\n'
+ '  </style>\n'
+ '</head>\n'
+ '<body>\n'
+ '  <div class="header">\n'
+ '    <div class="header__icon">🖼️</div>\n'
+ '    <div>\n'
+ '      <h1>UAW Gallery Manager</h1>\n'
+ '      <p>Upload photos &amp; videos to your gallery categories — no code editing needed</p>\n'
+ '    </div>\n'
+ '  </div>\n'
+ '  <div class="container">\n'
+ '    <div class="section-title">1️⃣ &nbsp;Select a Category</div>\n'
+ '    <div class="section-desc">Choose which gallery card you want to add photos or videos to.</div>\n'
+ '    <div class="categories-grid" id="categoriesGrid">' + cardsHTML + '</div>\n'
+ '    <div class="upload-panel" id="uploadPanel">\n'
+ '      <div class="upload-panel__header">\n'
+ '        <div class="upload-panel__title">\n'
+ '          <span id="panelIcon"></span>\n'
+ '          <span>Upload to <strong id="panelTitle"></strong></span>\n'
+ '        </div>\n'
+ '        <button class="btn btn-ghost" onclick="closePanel()">✕ Close</button>\n'
+ '      </div>\n'
+ '      <div class="drop-zone" id="dropZone">\n'
+ '        <input type="file" id="fileInput" multiple accept="image/*,video/*" onchange="handleFiles(this.files)">\n'
+ '        <span class="drop-zone__icon">📂</span>\n'
+ '        <p class="drop-zone__text">Drag &amp; drop your photos or videos here</p>\n'
+ '        <p class="drop-zone__sub">or click to browse • Supports JPG, PNG, WEBP, GIF, MP4, MOV, WEBM</p>\n'
+ '      </div>\n'
+ '      <ul class="file-list" id="fileList"></ul>\n'
+ '      <div style="display: flex; gap: 12px; align-items: center;" id="uploadActions" style="display:none">\n'
+ '        <button class="btn btn-primary" id="uploadBtn" onclick="uploadFiles()">🚀 Upload &amp; Update Gallery</button>\n'
+ '        <button class="btn btn-ghost" onclick="clearFiles()">🗑️ Clear All</button>\n'
+ '      </div>\n'
+ '      <div class="existing-section" id="existingSection"></div>\n'
+ '    </div>\n'
+ '  </div>\n'
+ '  <script>\n'
+ '    var categories = ' + JSON.stringify(categories) + ';\n'
+ '    var selectedCategoryId = null;\n'
+ '    var selectedFiles = [];\n'
+ '\n'
+ '    function selectCategory(id) {\n'
+ '      selectedCategoryId = id;\n'
+ '      document.querySelectorAll(".cat-card").forEach(function(c) { c.classList.remove("active"); });\n'
+ '      document.querySelector(".cat-card[data-id=\\"" + id + "\\"]").classList.add("active");\n'
+ '      var panel = document.getElementById("uploadPanel");\n'
+ '      var cat = categories.find(function(c) { return c.id === id; });\n'
+ '      panel.classList.add("visible");\n'
+ '      document.getElementById("panelIcon").textContent = cat.icon;\n'
+ '      document.getElementById("panelTitle").textContent = cat.title;\n'
+ '      clearFiles();\n'
+ '      showExisting(cat);\n'
+ '      panel.scrollIntoView({ behavior: "smooth", block: "start" });\n'
+ '    }\n'
+ '\n'
+ '    function closePanel() {\n'
+ '      document.getElementById("uploadPanel").classList.remove("visible");\n'
+ '      document.querySelectorAll(".cat-card").forEach(function(c) { c.classList.remove("active"); });\n'
+ '      selectedCategoryId = null;\n'
+ '      clearFiles();\n'
+ '    }\n'
+ '\n'
+ '    function showExisting(cat) {\n'
+ '      var section = document.getElementById("existingSection");\n'
+ '      if (cat.existingFiles.length === 0) {\n'
+ '        section.innerHTML = \'<p style="font-size:0.85rem;color:var(--text-muted)">No files uploaded yet for this category.</p>\';\n'
+ '        return;\n'
+ '      }\n'
+ '      var regMap = {};\n'
+ '      cat.images.forEach(function(img) {\n'
+ '        var fn = img.src.split("/").pop();\n'
+ '        regMap[fn] = img.caption;\n'
+ '      });\n'
+ '      var gridHTML = "";\n'
+ '      cat.existingFiles.forEach(function(f) {\n'
+ '        var ext = f.split(".").pop().toLowerCase();\n'
+ '        var isVideo = ["mp4","mov","avi","webm"].indexOf(ext) !== -1;\n'
+ '        var src = "/gallery/" + cat.id + "/" + f;\n'
+ '        var isReg = regMap[f] !== undefined;\n'
+ '        var borderColor = isReg ? "rgba(34,197,94,0.3)" : "var(--border)";\n'
+ '        gridHTML += \'<div class="existing-item" style="border-color:\' + borderColor + \'">\';\n'
+ '        gridHTML += \'<button class="existing-item__delete" onclick="deleteFile(\\\'\'  + cat.id + \'\\\', \\\'\'  + f + \'\\\')" title="Delete">✕</button>\';\n'
+ '        if (isVideo) {\n'
+ '          gridHTML += \'<video src="\' + src + \'" muted></video>\';\n'
+ '        } else {\n'
+ '          gridHTML += \'<img src="\' + src + \'" alt="\' + f + \'">\';\n'
+ '        }\n'
+ '        gridHTML += \'<div class="existing-item__label">\' + f + (isReg ? " ✅" : "") + \'</div>\';\n'
+ '        gridHTML += "</div>";\n'
+ '      });\n'
+ '      section.innerHTML = \'<div class="existing-title">📁 Existing Files (\' + cat.existingFiles.length + \')</div>\'\n'
+ '        + \'<div class="existing-grid">\' + gridHTML + \'</div>\';\n'
+ '    }\n'
+ '\n'
+ '    var dropZone = document.getElementById("dropZone");\n'
+ '    dropZone.addEventListener("dragover", function(e) { e.preventDefault(); dropZone.classList.add("dragover"); });\n'
+ '    dropZone.addEventListener("dragleave", function() { dropZone.classList.remove("dragover"); });\n'
+ '    dropZone.addEventListener("drop", function(e) { e.preventDefault(); dropZone.classList.remove("dragover"); handleFiles(e.dataTransfer.files); });\n'
+ '\n'
+ '    function handleFiles(fileList) {\n'
+ '      for (var i = 0; i < fileList.length; i++) {\n'
+ '        var file = fileList[i];\n'
+ '        if (!/\\.(jpg|jpeg|png|gif|webp|mp4|mov|avi|webm)$/i.test(file.name)) continue;\n'
+ '        var previewUrl = URL.createObjectURL(file);\n'
+ '        selectedFiles.push({ file: file, caption: "", previewUrl: previewUrl });\n'
+ '      }\n'
+ '      renderFileList();\n'
+ '    }\n'
+ '\n'
+ '    function renderFileList() {\n'
+ '      var list = document.getElementById("fileList");\n'
+ '      var actions = document.getElementById("uploadActions");\n'
+ '      if (selectedFiles.length === 0) {\n'
+ '        list.innerHTML = "";\n'
+ '        actions.style.display = "none";\n'
+ '        return;\n'
+ '      }\n'
+ '      actions.style.display = "flex";\n'
+ '      var html = "";\n'
+ '      selectedFiles.forEach(function(item, i) {\n'
+ '        var ext = item.file.name.split(".").pop().toLowerCase();\n'
+ '        var isVideo = ["mp4","mov","avi","webm"].indexOf(ext) !== -1;\n'
+ '        var sizeKB = (item.file.size / 1024).toFixed(0);\n'
+ '        var sizeMB = (item.file.size / (1024*1024)).toFixed(1);\n'
+ '        var sizeStr = item.file.size > 1024*1024 ? sizeMB + " MB" : sizeKB + " KB";\n'
+ '        html += \'<li class="file-item">\';\n'
+ '        html += \'<div class="file-item__preview">\';\n'
+ '        if (isVideo) {\n'
+ '          html += \'<video src="\' + item.previewUrl + \'" muted></video>\';\n'
+ '        } else {\n'
+ '          html += \'<img src="\' + item.previewUrl + \'" alt="">\';\n'
+ '        }\n'
+ '        html += "</div>";\n'
+ '        html += \'<div class="file-item__info">\';\n'
+ '        html += \'<div class="file-item__name">\' + item.file.name + "</div>";\n'
+ '        html += \'<div class="file-item__size">\' + sizeStr + " • " + ext.toUpperCase() + "</div>";\n'
+ '        html += "</div>";\n'
+ '        html += \'<div class="file-item__caption">\';\n'
+ '        html += \'<input type="text" placeholder="Add a caption (optional)..." value="\' + item.caption + \'" oninput="updateCaption(\' + i + \', this.value)">\';\n'
+ '        html += "</div>";\n'
+ '        html += \'<button class="file-item__remove" onclick="removeFile(\' + i + \')" title="Remove">✕</button>\';\n'
+ '        html += "</li>";\n'
+ '      });\n'
+ '      list.innerHTML = html;\n'
+ '    }\n'
+ '\n'
+ '    function updateCaption(index, value) { selectedFiles[index].caption = value; }\n'
+ '\n'
+ '    function removeFile(index) {\n'
+ '      URL.revokeObjectURL(selectedFiles[index].previewUrl);\n'
+ '      selectedFiles.splice(index, 1);\n'
+ '      renderFileList();\n'
+ '    }\n'
+ '\n'
+ '    function clearFiles() {\n'
+ '      selectedFiles.forEach(function(f) { URL.revokeObjectURL(f.previewUrl); });\n'
+ '      selectedFiles = [];\n'
+ '      renderFileList();\n'
+ '      document.getElementById("fileInput").value = "";\n'
+ '    }\n'
+ '\n'
+ '    function uploadFiles() {\n'
+ '      if (!selectedCategoryId || selectedFiles.length === 0) return;\n'
+ '      var btn = document.getElementById("uploadBtn");\n'
+ '      btn.disabled = true;\n'
+ '      btn.innerHTML = \'<span class="spinner"></span> Uploading...\';\n'
+ '      var formData = new FormData();\n'
+ '      formData.append("categoryId", selectedCategoryId);\n'
+ '      selectedFiles.forEach(function(item, i) {\n'
+ '        formData.append("files", item.file);\n'
+ '        formData.append("caption_" + i, item.caption || item.file.name.replace(/\\.[^.]+$/, "").replace(/[-_]/g, " "));\n'
+ '      });\n'
+ '      fetch("/api/upload", { method: "POST", body: formData })\n'
+ '        .then(function(res) { return res.json(); })\n'
+ '        .then(function(data) {\n'
+ '          if (data.success) {\n'
+ '            showToast("success", "✅ " + data.message);\n'
+ '            setTimeout(function() { window.location.reload(); }, 1500);\n'
+ '          } else {\n'
+ '            showToast("error", "❌ " + (data.error || "Upload failed"));\n'
+ '          }\n'
+ '        })\n'
+ '        .catch(function(err) {\n'
+ '          showToast("error", "❌ Network error: " + err.message);\n'
+ '        })\n'
+ '        .finally(function() {\n'
+ '          btn.disabled = false;\n'
+ '          btn.innerHTML = "🚀 Upload & Update Gallery";\n'
+ '        });\n'
+ '    }\n'
+ '\n'
+ '    function deleteFile(categoryId, filename) {\n'
+ '      var overlay = document.createElement("div");\n'
+ '      overlay.className = "confirm-overlay";\n'
+ '      var boxHTML = "<div class=\\"confirm-box\\">";\n'
+ '      boxHTML += "<span class=\\"confirm-box__icon\\">\\ud83d\\uddd1\\ufe0f</span>";\n'
+ '      boxHTML += "<div class=\\"confirm-box__title\\">Delete this file?</div>";\n'
+ '      boxHTML += "<div class=\\"confirm-box__desc\\">This will permanently delete <strong>" + filename + "</strong> from the <strong>" + categoryId + "</strong> folder and remove it from Gallery.jsx.</div>";\n'
+ '      boxHTML += "<div class=\\"confirm-box__actions\\">";\n'
+ '      boxHTML += "<button class=\\"btn btn-ghost\\" id=\\"cancelDeleteBtn\\">Cancel</button>";\n'
+ '      boxHTML += "<button class=\\"btn btn-danger\\" id=\\"confirmDeleteBtn\\">\\ud83d\\uddd1\\ufe0f Yes, Delete</button>";\n'
+ '      boxHTML += "</div></div>";\n'
+ '      overlay.innerHTML = boxHTML;\n'
+ '      document.body.appendChild(overlay);\n'
+ '      document.getElementById("cancelDeleteBtn").onclick = function() { overlay.remove(); };\n'
+ '      overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };\n'
+ '      document.getElementById("confirmDeleteBtn").onclick = function() {\n'
+ '        var btn = document.getElementById("confirmDeleteBtn");\n'
+ '        btn.disabled = true;\n'
+ '        btn.innerHTML = "<span class=\\"spinner\\"></span> Deleting...";\n'
+ '        fetch("/api/delete", {\n'
+ '          method: "POST",\n'
+ '          headers: { "Content-Type": "application/json" },\n'
+ '          body: JSON.stringify({ categoryId: categoryId, filename: filename })\n'
+ '        })\n'
+ '        .then(function(res) { return res.json(); })\n'
+ '        .then(function(data) {\n'
+ '          overlay.remove();\n'
+ '          if (data.success) {\n'
+ '            showToast("success", "🗑️ " + data.message);\n'
+ '            setTimeout(function() { window.location.reload(); }, 1200);\n'
+ '          } else {\n'
+ '            showToast("error", "❌ " + (data.error || "Delete failed"));\n'
+ '          }\n'
+ '        })\n'
+ '        .catch(function(err) {\n'
+ '          overlay.remove();\n'
+ '          showToast("error", "❌ Network error: " + err.message);\n'
+ '        });\n'
+ '      };\n'
+ '    }\n'
+ '\n'
+ '    function showToast(type, message) {\n'
+ '      var toast = document.createElement("div");\n'
+ '      toast.className = "toast toast--" + type;\n'
+ '      toast.textContent = message;\n'
+ '      document.body.appendChild(toast);\n'
+ '      setTimeout(function() { toast.remove(); }, 3200);\n'
+ '    }\n'
+ '  </script>\n'
+ '</body>\n'
+ '</html>';

  return html;
}

// ── Server ───────────────────────────────────────────────────

const server = http.createServer(function (req, res) {
  // Serve the manager UI
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(getHTML());
    return;
  }

  // Serve gallery images for preview
  if (req.method === "GET" && req.url.startsWith("/gallery/")) {
    const filePath = path.join(__dirname, "public", decodeURIComponent(req.url));
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".mp4": "video/mp4",
        ".mov": "video/quicktime",
        ".webm": "video/webm",
        ".avi": "video/x-msvideo",
      };
      res.writeHead(200, {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  // Handle upload
  if (req.method === "POST" && req.url === "/api/upload") {
    const contentType = req.headers["content-type"] || "";
    const boundaryMatch = contentType.match(/boundary=(.+)/);

    if (!boundaryMatch) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "No boundary found" }));
      return;
    }

    const boundary = boundaryMatch[1];
    const chunks = [];

    req.on("data", function (chunk) { chunks.push(chunk); });
    req.on("end", function () {
      try {
        const buffer = Buffer.concat(chunks);
        const { files, fields } = parseMultipart(buffer, boundary);
        const categoryId = fields.categoryId;

        if (!categoryId) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "No category specified" }));
          return;
        }

        // Create category directory if needed
        const catDir = path.join(GALLERY_DIR, categoryId);
        if (!fs.existsSync(catDir)) {
          fs.mkdirSync(catDir, { recursive: true });
        }

        // Get existing files to determine next number
        const existingFiles = fs
          .readdirSync(catDir)
          .filter(function (f) {
            return /\.(jpg|jpeg|png|gif|webp|mp4|mov|avi|webm)$/i.test(f);
          });

        // Find max number from existing files
        let maxNum = 0;
        for (const f of existingFiles) {
          const numMatch = f.match(/(\d+)/);
          if (numMatch) {
            const num = parseInt(numMatch[1], 10);
            if (num > maxNum) maxNum = num;
          }
        }

        // Save files with sequential naming
        const prefixMap = {
          "cow-feeding": "cow",
          "youth-kickstart": "yk",
          "dog-care": "dog",
          "girls-hygiene": "gh",
          "education": "edu",
          "plantation": "plt",
        };
        const filePrefix = prefixMap[categoryId] || categoryId.replace(/-/g, "").slice(0, 3);

        const savedFiles = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const ext = path.extname(file.filename).toLowerCase() || ".jpg";
          const newNum = maxNum + 1 + i;
          const newFilename = filePrefix + newNum + ext;
          const destPath = path.join(catDir, newFilename);

          fs.writeFileSync(destPath, file.data);

          const caption =
            fields["caption_" + i] ||
            file.filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");

          savedFiles.push({
            src: "/gallery/" + categoryId + "/" + newFilename,
            caption: caption,
          });
        }

        // Read current images from Gallery.jsx for this category
        const categories = getCategories();
        const cat = categories.find(function (c) { return c.id === categoryId; });
        const currentImages = cat ? cat.images : [];

        // Merge: keep existing + add new
        const allImages = [...currentImages, ...savedFiles];

        // Update Gallery.jsx
        const updated = updateGalleryJSX(categoryId, allImages);

        if (updated) {
          console.log("✅ Uploaded " + files.length + " file(s) to \"" + categoryId + "\" and updated Gallery.jsx");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            success: true,
            message: files.length + " file(s) uploaded to \"" + categoryId + "\" — Gallery.jsx updated!",
            files: savedFiles,
          }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            success: true,
            message: files.length + " file(s) saved but Gallery.jsx could not be auto-updated. Please update manually.",
            files: savedFiles,
          }));
        }
      } catch (err) {
        console.error("Upload error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle delete
  if (req.method === "POST" && req.url === "/api/delete") {
    let body = "";
    req.on("data", function (chunk) { body += chunk.toString(); });
    req.on("end", function () {
      try {
        const data = JSON.parse(body);
        const categoryId = data.categoryId;
        const filename = data.filename;

        if (!categoryId || !filename) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Missing categoryId or filename" }));
          return;
        }

        // Security: prevent path traversal
        if (filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Invalid filename" }));
          return;
        }

        const filePath = path.join(GALLERY_DIR, categoryId, filename);

        // Delete the file from disk
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("🗑️  Deleted file: " + filePath);
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "File not found on disk" }));
          return;
        }

        // Remove from Gallery.jsx — re-read the current images and filter out the deleted one
        const categories = getCategories();
        const cat = categories.find(function (c) { return c.id === categoryId; });
        if (cat) {
          const srcPath = "/gallery/" + categoryId + "/" + filename;
          const updatedImages = cat.images.filter(function (img) {
            return img.src !== srcPath;
          });
          const updated = updateGalleryJSX(categoryId, updatedImages);
          if (updated) {
            console.log("📝 Updated Gallery.jsx — removed " + filename + " from \"" + categoryId + "\"");
          }
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: true,
          message: filename + " deleted from \"" + categoryId + "\"!",
        }));
      } catch (err) {
        console.error("Delete error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, function () {
  console.log("");
  console.log("  ╔═══════════════════════════════════════════════════════╗");
  console.log("  ║                                                       ║");
  console.log("  ║   🖼️  UAW Gallery Manager is running!                 ║");
  console.log("  ║   🌐  Open: http://localhost:" + PORT + "                     ║");
  console.log("  ║   📂  Files go to: public/gallery/<category>/         ║");
  console.log("  ║   📝  Auto-updates: src/pages/Gallery.jsx             ║");
  console.log("  ║                                                       ║");
  console.log("  ║   Press Ctrl+C to stop                                ║");
  console.log("  ║                                                       ║");
  console.log("  ╚═══════════════════════════════════════════════════════╝");
  console.log("");
});
