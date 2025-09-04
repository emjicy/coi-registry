# Compound DAO COI Registry

This repository contains the canonical **Conflict of Interest (COI) registry** for Compound DAO delegates.

## Purpose

- Provide a transparent, machine‑readable record of delegate affiliations and financial interests.
- Generate artifacts (CSV and Markdown mirrors) for dashboards and forum posts.

## Usage

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Validate the registry**
   ```sh
   npm run validate
   ```
   This ensures `registry.json` conforms to the JSON schema defined in `schemas/coi-registry.schema.json`.
3. **Build artifacts**
   ```sh
   npm run build
   ```
   This command bumps the `generated_at` timestamp, validates the registry, and produces CSV and Markdown mirrors in the `public/` directory.

## Contribution Workflow

1. Fork the repository and create a feature branch.
2. Edit `registry.json` to add or update delegate entries (maintaining alphabetical order by `id`).
3. Run `npm run validate` to ensure your changes pass schema validation.
4. Commit your changes and push your branch.
5. Open a pull request with a title like `COI: <id> add/update`. Paste each new or updated disclosure line in the PR body.

For detailed update instructions, see the PR template in `.github/pull_request_template.md`.
