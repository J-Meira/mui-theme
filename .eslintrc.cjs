module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'storybook-static', 'stories', 'clean.ts', 'copy.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    // "react/jsx-uses-react": "off",
    // "react/react-in-jsx-scope": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/ban-ts-comment": "off",
  },
}
