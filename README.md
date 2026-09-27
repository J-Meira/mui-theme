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

## Development

Requirements:

- [Node.js](https://nodejs.org/en/download/) 22.13 or newer
- [pnpm](https://pnpm.io/installation) 12 or newer

```bash
pnpm install
pnpm test        # vitest
pnpm lint        # eslint
pnpm build       # prettier + lint + clean + esm/cjs build + scss copy
pnpm sb          # storybook dev server on :6006
pnpm build-sb    # static storybook
```

## Storybook

[Click here](https://mui-theme.jm.app.br) to access.

> Contact: [J.Meira](https://github.com/J-Meira)
