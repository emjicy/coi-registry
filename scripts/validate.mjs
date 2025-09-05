// Validate COI JSON files. Works whether JSON lives at repo root or in public/
// No external deps.

import fs from "node:fs";
import path from "node:path";

function die(msg, code = 1) {
  console.error("❌", msg);
  process.exit(code);
}

function isFile(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function listJsonOnce(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.toLowerCase().endsWith(".json"))
      .map(f => path.join(dir, f));
  } catch {
    return [];
  }
}

// Discover candidate files
const candidates = new Set();

// Prefer public/ if present
if (fs.existsSync("public") && fs.statSync("public").isDirectory()) {
  for (const f of listJsonOnce("public")) candidates.add(f);
}

// Fallback: legacy root layout
if (isFile("registry.json")) candidates.add("registry.json");

// Guard
if (candidates.size === 0) {
  die("No JSON files found. Expected at least public/registry.json (or legacy registry.json at repo root).");
}

let errors = 0;

function validateOne(file) {
  try {
    const raw = fs.readFileSync(file, "utf8");
    if (!raw || !raw.trim()) die(`${file} is empty`);
    const j = JSON.parse(raw);

    // Light schema checks for registry.json specifically
    if (path.basename(file) === "registry.json") {
      if (!j || typeof j !== "object") throw new Error("top-level must be an object");
      if (!("delegates" in j)) {
        console.warn(`⚠️ ${file}: no 'delegates' key (allowed, but unusual)`);
      } else if (!Array.isArray(j.delegates)) {
        throw new Error("'delegates' must be an array");
      }
    }

    console.log("✓", file, "parses OK");
  } catch (e) {
    console.error("✗", file, "failed:", e.message);
    errors++;
  }
}

// Run validation
for (const f of candidates) validateOne(f);

// Final status
if (errors) process.exit(1);
console.log(`✅ Validated ${candidates.size} JSON file(s) successfully`);
