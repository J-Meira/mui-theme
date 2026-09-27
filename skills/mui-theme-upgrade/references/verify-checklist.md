# Verify checklist

Run after every stage. Stop at the first failure and fix it before continuing.

## Automated

```bash
<pm> install                    # no peer warnings expected
<pm> why @mui/material          # exactly one version
<pm> exec tsc --noEmit          # or the consumer's type-check script
<pm> run lint                   # if the consumer has one
<pm> test                       # unit tests
<pm> run build                  # production build
```

Watch for:

- `ERESOLVE` / unmet peer messages: a peer range in the consumer conflicts with the library's. Resolve by bumping the consumer's package, not by `--force`.
- Two `@mui/material` versions in `why`: a transitive dependency pins an older MUI; add an override in the consumer's package manager config.
- `Cannot use import statement outside a module` in tests: the Jest transform rule from Stage B5 is missing.
- `ERR_PACKAGE_PATH_NOT_EXPORTED`: a deep import into `@j-meira/mui-theme/dist`.
- TypeScript `TS2307` for `@j-meira/mui-theme`: `moduleResolution` is `node`/`node10`; switch to `bundler`.

## Manual screens

Open the app and check, in light and dark mode:

- A form with `Input` models `currency`, `mask`, `number`, `select` (native and non-native), `search`, `searchRequest`, `password`, `checkBox`, `radioGroup`. Type into each; submit; confirm Formik values.
- `DatePicker` and the `time` variant: keyboard section editing, the calendar button, min/max dates, the Today action if used.
- `FileUpload`: pick and clear a file.
- A `DataTable` page: sorting, pagination, rows-per-page, filters, row selection, actions column, truncated columns.
- `PopUp` and `DialogBox`: open, Escape, backdrop click, confirm/cancel.
- `Header`, `SideBar` (expanded and collapsed, mobile width), `SideBarItem` nesting, `BreadcrumbBar`, `Tabs` with an error tab.
- Toasts via `useToast` (all variants) and the close button.
- `DarkSwitch`: toggling persists across reload.

Note anything that looks different from before and decide with the user whether it is the intended 3.0 behaviour (Stage B6 table) or a regression.
