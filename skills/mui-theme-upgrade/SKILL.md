---
name: mui-theme-upgrade
description: Upgrade an app that consumes @j-meira/mui-theme to 3.0 from any installed 1.x or 2.x version. Detects the installed version and walks through every remaining stage (1.x -> 2.0 on MUI 7, then 2.x -> 3.0 on MUI 9 with peer dependencies and ESM-only output), runs the MUI codemods, and verifies the build. Use when a project depends on @j-meira/mui-theme and needs to move to 3.x, or when a 1.x -> 2.0 migration was left unfinished.
---

# Upgrade a consumer to @j-meira/mui-theme 3.0

Run this inside the consumer's repository. Work stage by stage, commit after each stage, and never skip verification.

## 0. Preflight

1. Require a clean git working tree. Create a branch `chore/mui-theme-3`.
2. Detect the package manager from the lockfile (`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lockb`). Use it for every install below; never mix.
3. Run the detector and read its output before deciding anything:

```bash
node <skill-dir>/scripts/detect.mjs
```

It prints the installed `@j-meira/mui-theme` version, the MUI / pickers / React versions in the tree, whether Jest is configured, whether MUI or the future peers are already direct dependencies, and the stages that apply. `<skill-dir>` is this skill's folder (in the consumer it is usually `.claude/skills/mui-theme-upgrade` or `node_modules/@j-meira/mui-theme/skills/mui-theme-upgrade`).

## 1. Decide the stages

| Installed `@j-meira/mui-theme` | Stages                                       |
| ------------------------------ | -------------------------------------------- |
| `< 1.9.0` (MUI 6, pickers 7)   | Stage A, then Stage B                        |
| `>= 1.9.0 < 2.0.0`             | Stage B only (1.9.x is API-identical to 2.0) |
| `2.x`                          | Stage B only                                 |
| `3.x`                          | Nothing to do; run Verify                    |

Tell the user the plan and the breaking changes that apply to them before touching files.

## 2. Stage A: 1.x -> 2.0 (MUI 6 -> 7)

Follow `references/stage-a-1x-to-2.md`. Summary:

- Bump `@j-meira/mui-theme` to `^2.0.2`, React to `^19.2`, and any direct `@mui/material` to `^7.3` / `@mui/x-date-pickers` to `^8`.
- Run the MUI v7 codemods (`Grid2` -> `Grid`, `InputLabel size`, lab imports) and the pickers v8 codemod.
- Replace remaining `<Grid xs={..} md={..}>` with `<Grid size={{ xs, md }}>` and `Grid2` imports with `Grid`.
- Remove invalid DOM props React 19 warns about.
- Verify (section 4), commit `chore: mui-theme 2.0 (MUI 7)`.

The library's own public API did not change between 1.x and 2.0; every edit here is in the consumer's own MUI usage.

## 3. Stage B: 2.x -> 3.0 (MUI 9, peer dependencies, ESM only)

Follow `references/stage-b-2x-to-3.md`. Summary:

- Install the peer dependencies the library no longer bundles: `@mui/material@^9`, `@mui/x-date-pickers@^9`, `@emotion/react`, `@emotion/styled`, `formik@^2.4`, `notistack@^3`, `dayjs@^1.11`, `react-icons@^5`. Bump `@j-meira/mui-theme` to `^3.0.0`.
- Run the MUI v9 codemod (`deprecations/all`) and the pickers v9 codemod on the consumer's code.
- Fix removed system props (`display`, `mt`, `color="primary.main"` on Grid/Box/Typography/Stack/Link -> `sx`), `inputProps`/`InputProps` -> `slotProps`, Autocomplete `renderTags` -> `renderValue`.
- Remove any deep import into `@j-meira/mui-theme/dist/...`; the `exports` map blocks them. Import from the package root or `@j-meira/mui-theme/scss/*`.
- ESM only: if the consumer runs Jest, add `transformIgnorePatterns: ['node_modules/(?!@j-meira/mui-theme)']` (or move to Vitest). Vite needs nothing.
- Review the behaviour changes listed in the reference (Currency mask in `localControl` mode, DatePicker opens from its button only, RadioGroup value in Formik, `formatCurrency`), and search the consumer code for each affected component.
- Confirm toolchain minimums: Node 22.13+ for the build, browsers Chrome 117 / Edge 121 / Firefox 121 / Safari 17.
- Verify (section 4), commit `chore: mui-theme 3.0 (MUI 9, peer deps, ESM)`.

## 4. Verify

Follow `references/verify-checklist.md`. At minimum, in this order: install, type-check, lint, unit tests, production build, then the manual screen checklist (forms with Currency / Mask / DatePicker / Select / Search, a DataTable with pagination and filters, PopUp, SideBar, dark mode). Stop and fix at the first red step; do not carry failures into the next stage.

## 5. Report

End with: the versions before and after, the stages applied, the codemods run, every manual change grouped by file, anything left for the user (screens to eyeball, a Jest config they should review), and the commit list.

## Rules while editing consumer code

- Only change what the upgrade requires. No refactors, no formatting sweeps outside the touched lines.
- Prefer the codemods; hand-edit only what they leave behind.
- Keep the consumer's conventions (import style, semicolons, quotes). Respect the consumer's `CLAUDE.md` if it has one.
- Never edit `node_modules`. Never bump unrelated dependencies.
