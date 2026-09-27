# Mui Theme

UI theme and form components built on [Material UI](https://mui.com/material-ui/) and [Formik](https://formik.org/).

## Install

The package declares its UI libraries as peer dependencies, so install them alongside it:

```bash
pnpm add @j-meira/mui-theme @mui/material @mui/x-date-pickers @emotion/react @emotion/styled formik notistack dayjs react-icons
```

Styles are shipped as SCSS:

```scss
@use '@j-meira/mui-theme/scss/index.scss';
```

## Upgrading to 3.0

A Claude Code skill walks a consumer app through the upgrade from any 1.x or 2.x version. It detects the installed version, applies the stages that still apply (1.x -> 2.0 on MUI 7, then 2.x -> 3.0 on MUI 9 with peer dependencies and ESM-only output), runs the MUI codemods and verifies the build.

In the consumer repo, after installing 3.x:

```bash
mkdir -p .claude/skills
cp -r node_modules/@j-meira/mui-theme/skills/mui-theme-upgrade .claude/skills/
```

Then ask Claude Code to `/mui-theme-upgrade`. The skill source lives in [skills/mui-theme-upgrade](skills/mui-theme-upgrade/SKILL.md); the detector can be run on its own with `node skills/mui-theme-upgrade/scripts/detect.mjs <consumer-dir>`.
## Development

Requirements:

- [Node.js](https://nodejs.org/en/download/) 22.13 or newer
- [pnpm](https://pnpm.io/installation) 12 or newer

```bash
pnpm install
pnpm test        # jest
pnpm lint        # eslint
pnpm build       # prettier + lint + clean + esm/cjs build + scss copy
pnpm sb          # storybook dev server on :6006
pnpm build-sb    # static storybook
```

## Storybook

[Click here](https://mui-theme.jm.app.br) to access.

> Contact: [J.Meira](https://github.com/J-Meira)
