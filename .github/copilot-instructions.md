# Copilot Instructions for MUI-Theme Project

## Project Context

- **Repository**: J-Meira/mui-theme
- **Tech Stack**: TypeScript (89.2%), SCSS (5.7%), MDX (3.9%)
- **Package Manager**: pnpm
- **Testing Framework**: Jest with React Testing Library
- **Current Version**: 3.0.0 (in progress on `release/3.0`)
- **Main Dependencies**: MUI v9, MUI X Date Pickers v9, React 19, Formik, Notistack, Day.js, Vite 7, Storybook 10 (MUI, Emotion, Formik, Notistack, Day.js, react-icons and Date Pickers are peer dependencies)

---

## 🎯 Development Guidelines

### 1. Testing Requirements

**Testing Standards:**

- Use Jest with React Testing Library (@testing-library/react v16)
- Follow the existing test configuration in `jestconfig.json`
- Test file naming convention: `[component-name].test.tsx` or `[hook-name].test.tsx`
- Place tests in the `/tests` directory mirroring the `/src` structure
- Maintain minimum 85% test coverage

**Test Coverage Requirements:**

- **Components**: Test rendering, props handling, user interactions, accessibility, edge cases
- **Hooks**: Test initial state, state changes, side effects, error handling, cleanup

**Test Structure Template:**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../src/components/ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', () => {
    // Test implementation
  });

  it('should handle props correctly', () => {
    // Test implementation
  });
});
```

---

### 2. Code Quality Rules

### 2. Code Quality Rules

#### A. **Optimize for Memory Issues**

**Guidelines:**

- Use `useMemo` for expensive computations
- Use `useCallback` for function props passed to child components
- Avoid unnecessary re-renders with `React.memo` for pure components
- Clean up side effects in `useEffect` cleanup functions
- Avoid creating objects/arrays in render methods

**Example:**

```typescript
// ❌ Bad - creates new object on every render
const style = { padding: '10px' };

// ✅ Good - memoized or moved outside component
const STYLE = { padding: '10px' };
// or
const style = useMemo(() => ({ padding: '10px' }), []);
```

#### B. **Eliminate `else` Statements**

**Guidelines:**

- Use early returns instead of else blocks
- Use ternary operators for simple conditions
- Use switch statements or object lookups for multiple conditions

**Examples:**

```typescript
// ❌ Bad
if (condition) {
  return resultA;
} else {
  return resultB;
}

// ✅ Good - early return
if (condition) {
  return resultA;
}
return resultB;

// ✅ Good - ternary
return condition ? resultA : resultB;
```

#### C. **Prefer `const` Over `let`**

**Guidelines:**

- Use `const` by default for all variable declarations
- Only use `let` when reassignment is absolutely necessary
- Avoid `var` entirely
- For objects/arrays that need modification, use `const` with mutation methods

**Examples:**

```typescript
// ❌ Bad
let items = [];
items = [...items, newItem];

// ✅ Good
const items = [];
items.push(newItem);

// ✅ Good - when creating new reference
const items = [];
const newItems = [...items, newItem];
```

#### D. **Do NOT Add Comments**

**Guidelines:**

- Do NOT add explanatory comments when refactoring or creating new code
- Code should be self-explanatory through clear naming and structure
- Only preserve existing comments that are already in the codebase
- Comments waste time and need to be manually removed

---

### 3. Storybook Standards

**Current Storybook Version**: 10.6

**Guidelines:**

- Use CSF 3.0 (Component Story Format)
- Ensure all components have comprehensive stories
- Include all prop variations and states
- Add interaction tests using `@storybook/test`
- Document props using JSDoc comments

**Story Template:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../src/components/ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // default props
  },
};

export const Variant: Story = {
  args: {
    // variant props
  },
};
```

---

## 🔄 MUI v9 Notes

- Legacy props are gone: use `slotProps.input` instead of `inputProps` / `InputProps`, `slots` instead of `components`, `slotProps` instead of `componentsProps`.
- System props (`display`, `mt`, `color="primary.main"`, ...) are removed from Grid, Box, Typography, Stack and Link. Use `sx`.
- Migration guide: https://mui.com/material-ui/migration/upgrade-to-v9/

## 🔄 MUI Grid v2 Migration Guidelines

**Migration Documentation**: [MUI Grid v2 Upgrade Guide](https://mui.com/material-ui/migration/upgrade-to-grid-v2/)

### Key Changes:

#### A. **Removed Props**

- `item` prop is removed - all Grid components are automatically items
- `zeroMinWidth` prop is removed

**Before:**

```typescript
<Grid item zeroMinWidth xs={12}>
```

**After:**

```typescript
<Grid size={12}>
```

#### B. **Size Prop Structure**

Breakpoint props (`xs`, `sm`, `md`, `lg`, `xl`) are consolidated into `size` prop:

**Single size across all breakpoints:**

```typescript
<Grid size={6}>
```

**Responsive sizes:**

```typescript
<Grid size={{ xs: 12, sm: 6, md: 4 }}>
```

**Grow behavior (previously `xs`):**

```typescript
<Grid size="grow">
```

#### C. **Container Behavior**

- Grid containers don't grow to full width by default
- Add explicit width when needed:

```typescript
<Grid container sx={{ width: '100%' }}>
```

Or use flex-based approach:

```typescript
<Grid container sx={{ flexGrow: 1 }}>
```

#### D. **Implementation Standards**

- Use CSS variables for styling (better specificity control)
- `sx` prop works seamlessly without CSS specificity issues
- Nested grids have no depth limitation
- No negative margins (no overflow issues)
- Use offset feature for positioning flexibility

### Project-Specific Implementation:

- `GridSizeProps` type in `src/components/Input/defaultGrid.ts` handles size prop structure
- Default grid: `{ xs: 12, sm: 12, md: 6, lg: 8 }` used across Input components
- `noGrid` prop available in Input components to bypass Grid wrapper
- Grid spreading pattern: `size={{ ...defaultGrid, ...grid }}`

---

## 📁 Project Structure

```
src/
├── components/     # All React components
│   └── [Component]/
│       ├── index.tsx
│       └── styles.scss
├── hooks/          # Custom React hooks
│   └── [hook-name].ts
├── scss/           # Global styles
└── index.tsx       # Main export file

tests/
├── components/     # Component tests
│   └── [Component].test.tsx
└── hooks/          # Hook tests
    └── [hook-name].test.tsx

stories/
└── [Component].stories.tsx
```

---

## 🔍 Code Review Checklist

Before completing each file:

- [ ] No `else` statements used
- [ ] Only `let` used when absolutely necessary (prefer `const`)
- [ ] Memory optimization applied (useMemo, useCallback, React.memo where appropriate)
- [ ] Tests cover all functionality
- [ ] Storybook story is updated/created
- [ ] TypeScript types are properly defined
- [ ] No ESLint warnings or errors
- [ ] Code formatted with Prettier

---

## 📝 Scripts Reference

- `pnpm test` - Run all tests
- `pnpm test -- --coverage` - Run tests with coverage report
- `pnpm lint` - Run ESLint
- `pnpm prettier` - Format code
- `pnpm build` - Build package (ESM + CJS)
- `pnpm sb` - Run Storybook dev server
- `pnpm pre-build` - Run prettier, lint, and clean

---
