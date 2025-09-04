import fs from "fs";
import Papa from "papaparse";

const reg = JSON.parse(fs.readFileSync("./registry.json", "utf8"));

const rows = [];
for (const d of reg.delegates) {
  for (const typ of ["direct", "indirect"]) {
    const items = d.interests?.[typ] || [];
    for (const it of items) {
      rows.push({
        delegate_id: d.id,
        display_name: d.display_name,
        organization: d.organization || "",
        compliance: d.compliance,
        wallet: (d.wallets && d.wallets[0]) || "",
        interest_scope: typ,
        project: it.project,
        project_slug: it.project_slug || "",
        role: it.role,
        interest_type: it.interest_type,
        materiality: it.materiality,
        status: it.status,
        org_affiliation: it.org_affiliation || "",
        compensation_currency: it.compensation_currency || "",
        start_date: it.time?.start_date || "",
        end_date: it.time?.end_date || "",
        ongoing: String(!!it.time?.ongoing),
        disclosure: it.disclosure?.short_text || ""
      });
    }
  }
}

const csv = Papa.unparse(rows, { newline: "\n" });
fs.mkdirSync("./public", { recursive: true });
fs.writeFileSync("./public/registry.csv", csv);
console.log("OK: wrote public/registry.csv");