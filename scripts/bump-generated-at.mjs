import fs from "fs";

const reg = JSON.parse(fs.readFileSync("./registry.json", "utf8"));
reg.generated_at = new Date().toISOString();
fs.writeFileSync("./registry.json", JSON.stringify(reg, null, 2));
console.log("OK: bumped generated_at");