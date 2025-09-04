import fs from "fs";

const reg = JSON.parse(fs.readFileSync("./registry.json", "utf8"));

const hdr = `| Delegate | Org | Compliance | Scope | Project | Role | Type | Materiality | Status | Disclosure |\n|---|---|---|---|---|---|---|---|---|---|\n`;
let body = "";

for (const d of reg.delegates) {
  for (const typ of ["direct", "indirect"]) {
    const items = d.interests?.[typ] || [];
    for (const it of items) {
      // Escape pipe characters in disclosure
      const disclosureText = (it.disclosure?.short_text || "").replace(/\|/g, "\\|");
      body += `| ${d.display_name} (${d.id}) | ${d.organization || ""} | ${d.compliance} | ${typ} | ${it.project} | ${it.role} | ${it.interest_type} | ${it.materiality} | ${it.status} | ${disclosureText} |\n`;
    }
  }
}

const out = `# COI Registry (Mirror)\n\nLast build: ${reg.generated_at}\n\n${hdr}${body}`;
fs.mkdirSync("./public", { recursive: true });
fs.writeFileSync("./public/registry.md", out);
console.log("OK: wrote public/registry.md");