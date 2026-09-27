# Stage B: @j-meira/mui-theme 2.x -> 3.0

Applies to every installed version below 3.0.0 once Stage A (if needed) is done.

## What changed in 3.0

| Area                                                         | 2.x                       | 3.0                                                                           |
| ------------------------------------------------------------ | ------------------------- | ----------------------------------------------------------------------------- |
| MUI, pickers, Emotion, Formik, notistack, dayjs, react-icons | bundled as `dependencies` | **peer dependencies**, the consumer installs them                             |
| `@mui/material`                                              | 7.3                       | 9.x (7.3 still accepted by the peer range, but the consumer should move to 9) |
| `@mui/x-date-pickers`                                        | 8.x                       | 9.x (8 still accepted)                                                        |
| Package format                                               | ESM + CommonJS            | **ESM only**                                                                  |
| Compile target                                               | ES5                       | ES2020                                                                        |
| Deep imports (`@j-meira/mui-theme/dist/...`)                 | worked by accident        | blocked by the `exports` map                                                  |
| Node for the consumer's build                                | any                       | 22.13+                                                                        |
| Browsers                                                     | MUI 7 baseline            | Chrome 117, Edge 121, Firefox 121, Safari 17                                  |

Public exports are unchanged. A few components changed behaviour (see B6).

## Steps

### B1. Dependencies

```bash
<pm> add @j-meira/mui-theme@^3.0.0 \
  @mui/material@^9.0.0 @mui/x-date-pickers@^9.0.0 \
  @emotion/react@^11.14.0 @emotion/styled@^11.14.0 \
  formik@^2.4.0 notistack@^3.0.0 dayjs@^1.11.0 react-icons@^5.0.0
```

If the consumer uses `@mui/icons-material`, bump it to `^9`. If `@mui/lab` or `@mui/x-*` packages are present, bump them to the releases that support MUI 9.

Reinstall with a frozen lockfile off, then check for duplicate MUI copies:

```bash
<pm> why @mui/material
```

Exactly one version must resolve. Two versions mean the theme context is split and styling silently breaks.

### B2. MUI v9 codemod (consumer code)

```bash
npx @mui/codemod@latest deprecations/all src
```

Then search and fix:

- System props removed from `Box`, `Grid`, `Stack`, `Typography`, `Link`, `DialogContentText`: `display=`, `mt=`, `p=`, `color="primary.main"`, `bgcolor=`, `width=` ... -> `sx={{ ... }}`. Grep: `<(Box|Grid|Stack|Typography|Link)[^>]*\b(display|m[tblrxy]?|p[tblrxy]?|color|bgcolor|width|height|flex)=`.
- `Grid direction="column"` -> `Stack`.
- `InputProps` / `inputProps` / `SelectProps` / `InputLabelProps` / `FormHelperTextProps` on `TextField` -> `slotProps.input` / `slotProps.htmlInput` / `slotProps.select` / `slotProps.inputLabel` / `slotProps.formHelperText`.
- `components` / `componentsProps` -> `slots` / `slotProps`.
- Autocomplete `renderTags` -> `renderValue`, `getTagProps` -> `getItemProps`.
- Dialog `disableEscapeKeyDown` -> handle `reason === 'escapeKeyDown'` in `onClose`.
- `TextField select`: its label now renders as a `<div>`; tests using `getByLabelText` on selects may need `getByRole('combobox', { name })`.
- Icons: `*Outline` (no `d`) icon names removed from `@mui/icons-material`; use the `*Outlined` variant.

### B3. Pickers v9 codemod (consumer code)

```bash
npx @mui/x-codemod@latest v9.0.0/pickers/preset-safe src
```

Then: `unstableFieldRef` -> `fieldRef`, `PickersDay` -> `PickerDay` (also theme key `MuiPickersDay` -> `MuiPickerDay`), custom `textField` slots must accept `PickersTextFieldProps`, `MuiPickersAdapterContext` -> `usePickerAdapter()`.

### B4. Deep imports

Grep the consumer for `@j-meira/mui-theme/dist` and `@j-meira/mui-theme/src`. Replace with root imports. Allowed subpaths: the root, `@j-meira/mui-theme/scss/*`, `@j-meira/mui-theme/package.json`.

### B5. ESM only

- **Vite** consumers: nothing to do.
- **Jest** consumers (a `jest.config.*` or a `jest` key in `package.json`): Jest does not transform `node_modules` by default and the package no longer ships CommonJS. Add:

```js
transformIgnorePatterns: ['node_modules/(?!@j-meira/mui-theme)'],
```

and make sure the transformer handles ESM (`ts-jest` with `isolatedModules`, `babel-jest`, or `@swc/jest`). Recommend Vitest if the project is on Vite anyway.

- **Next.js / SSR**: add `@j-meira/mui-theme` to `transpilePackages`.

### B6. Behaviour changes in library components

Grep the consumer for each and confirm the new behaviour is acceptable:

| Component / API                              | Change                                                                                                                                                                                                          |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Input model='currency'` with `localControl` | The mask now applies in `localControl` mode too (it previously only applied in Formik mode). `onChange` receives the formatted value (`0.05`, `1234.56`). Clearing yields `''` instead of `.`.                  |
| `Input model='currency'` (Formik)            | Thousands were never separated (the regex was a no-op); no visible change.                                                                                                                                      |
| `Input model='mask'` with `slotProps`        | `readOnly` is now honoured even when `slotProps` is passed.                                                                                                                                                     |
| `Input model='radioGroup'` (Formik)          | The Formik value is now the selected option value (`'2'`), and the matching radio shows as checked. Previously an array was stored and nothing looked checked. Code that worked around this can be removed.     |
| `DatePicker`                                 | Opens from the calendar button only; clicking the text field edits date sections instead (MUI X 9 accessible field).                                                                                            |
| `MultiProvider`                              | Dark mode is applied on the first render (no light flash). The localStorage key `MUI_THEME_DARk` is unchanged. Context value and theme are memoized; consumers reading `useMultiContext()` see the same values. |
| `useCookies.set/remove`                      | Expiry is written as a UTC string (`expires=Tue, 01 Jan 2030 00:00:00 GMT`). Same cookie semantics, correct format.                                                                                             |
| `useDebounce`                                | Pending calls are cancelled on unmount.                                                                                                                                                                         |
| `DataTableBody` columns with `limit`         | Non-string cell values are stringified before truncation instead of throwing.                                                                                                                                   |
| `TabPanel`                                   | Same visual result; now uses `sx` for `display`.                                                                                                                                                                |

### B7. Toolchain minimums

- Node 22.13 or newer for the consumer's build and CI (`engines` in the package).
- Browserslist / Vite `build.target` must cover Chrome 117, Edge 121, Firefox 121, Safari 17. Check `browserslist` in `package.json` and the Vite config.
- TypeScript: the package ships `.d.ts` built with TS 6; TS 5.x consumers are fine. `moduleResolution` must be `bundler` or `node16`/`nodenext` (not the removed `node`/`node10`) for the `exports` map to be honoured.

### B8. Verify and commit

Run the verify checklist. Commit as `chore: mui-theme 3.0 (MUI 9, peer deps, ESM)`.
