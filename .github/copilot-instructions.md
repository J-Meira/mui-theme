# Copilot Instructions for MUI-Theme Project

## Project Context

- **Repository**: J-Meira/mui-theme
- **Tech Stack**: TypeScript (89.2%), SCSS (5.7%), MDX (3.9%)
- **Package Manager**: pnpm
- **Testing Framework**: Jest with React Testing Library
- **Current Version**: 2.0.0
- **Main Dependencies**: MUI v7, React 19, Formik, Notistack, Day.js, Vite 7, Storybook 10

---

## 🎯 Development Guidelines

### 1. Testing Requirements

**Testing Standards:**

- Use Jest with React Testing Library (@testing-library/react v16.1.0)
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

**Current Storybook Version**: 10.1.2

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
