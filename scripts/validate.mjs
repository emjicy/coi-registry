import Ajv from "ajv/dist/2020.js"; //added .js
import addFormats from "ajv-formats";
import fs from "fs";

const schema = JSON.parse(fs.readFileSync("./schemas/coi-registry.schema.json", "utf8"));
const data = JSON.parse(fs.readFileSync("./registry.json", "utf8"));

const ajv = new Ajv({ allErrors: true, strict: false }); // 2020 dialect via import above
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error("Schema validation failed:");
  console.error(validate.errors);
  process.exit(1);
}
console.log("OK: registry.json validates against schema.");
