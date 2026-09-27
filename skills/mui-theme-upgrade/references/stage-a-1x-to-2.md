# Stage A: @j-meira/mui-theme 1.x -> 2.0

Applies when the installed version is below 1.9.0. Versions 1.9.x are already on MUI 7 and are API-identical to 2.0; for those, skip to Stage B.

## What changed between 1.0.x and 2.0

| Area                                     | 1.0.x                     | 2.0                                                               |
| ---------------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| `@mui/material` (bundled by the library) | 6.3                       | 7.3                                                               |
| `@mui/x-date-pickers` (bundled)          | 7.23                      | 8.19                                                              |
| React peer                               | ^19.0                     | ^19.2                                                             |
| Grid                                     | library used `Grid2`      | MUI 7 `Grid` (v2 API, `size` prop)                                |
| SCSS                                     | `@import` inside partials | `@use` (consumers importing `@j-meira/mui-theme/scss` unaffected) |
| Public exports                           | same list                 | same list                                                         |

The library's component props did not change. All work in this stage is the consumer's own MUI 6 -> 7 migration, forced by the library now requiring MUI 7 at runtime.

## Steps

### A1. Dependencies

```bash
<pm> add @j-meira/mui-theme@^2.0.2 react@^19.2.0 react-dom@^19.2.0
```

If the consumer lists MUI packages directly:

```bash
<pm> add @mui/material@^7.3.0 @mui/x-date-pickers@^8.0.0 @mui/icons-material@^7.3.0
```

Delete any `@mui/lab` usage that moved to core (Alert, Autocomplete, Rating, Skeleton, SpeedDial, ToggleButton, Pagination, AvatarGroup) or bump `@mui/lab` to a v7-compatible release.

### A2. MUI v7 codemods (consumer code only, e.g. `src`)

```bash
npx @mui/codemod@latest v7.0.0/grid-props src
npx @mui/codemod@latest v7.0.0/input-label-size-normal-medium src
npx @mui/codemod@latest v7.0.0/lab-removed-components src
```

Then search and fix what the codemods do not cover:

- `import { Grid2 } from '@mui/material'` or `@mui/material/Grid2` -> `Grid` / `@mui/material/Grid`.
- `import Grid from '@mui/material/Grid'` that relied on the **legacy** API (`item`, `xs={12}`) -> either convert to `size` or import `GridLegacy` temporarily. Converting is preferred:

```tsx
// before
<Grid item xs={12} md={6}>...</Grid>
// after
<Grid size={{ xs: 12, md: 6 }}>...</Grid>
```

- Theme overrides keyed `MuiGrid2` -> `MuiGrid`.
- Deep imports more than one level deep (`@mui/material/styles/createTheme`) -> `import { createTheme } from '@mui/material/styles'`.
- `onBackdropClick` on Dialog/Modal -> `onClose={(e, reason) => ...}`.
- `Hidden` component -> `sx={{ display: { xs: 'none', md: 'block' } }}` or `useMediaQuery`.

### A3. Pickers v8 codemod

```bash
npx @mui/x-codemod@latest v8.0.0/pickers/preset-safe src
```

Then:

- Remove `enableAccessibleFieldDOMStructure={false}` anywhere.
- Remove generic type parameters on pickers (`<DatePicker<Dayjs>>` -> `<DatePicker>`).
- Theme keys `MuiPickersPopper` -> `MuiPickerPopper`.
- Custom `field` / `textField` slots that read `InputProps` from props must use `usePickerContext()` instead.

The library's own `DatePicker` wrapper keeps the same props (`name`, `label`, `value`, `onChange`, `time`, `minDate`, `maxDate`, `showTodayButton`, `localControl`).

### A4. React 19 prop hygiene

React 19 warns on unknown DOM props. Typical leftovers in consumers of this library:

- `searchChange`, `action`, `model`, `grid`, `noGrid` passed down to a native element through `{...rest}`. Destructure them out before spreading.

### A5. Verify and commit

Run the verify checklist. Commit as `chore: mui-theme 2.0 (MUI 7)`.
