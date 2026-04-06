```markdown
# Whatsapp-Formater-GLM-5 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you how to develop and maintain the Whatsapp-Formater-GLM-5 project, a TypeScript-based application built with the Next.js framework. You'll learn the project's coding conventions, file organization, and how to write and run tests. This guide also provides suggested commands for common development workflows.

## Coding Conventions

### File Naming
- Use **camelCase** for file and folder names.
  - Example: `messageFormatter.ts`, `userProfile.tsx`

### Import Style
- Use **alias-based imports** for referencing modules.
  - Example:
    ```typescript
    import utils from '@/utils/messageUtils';
    ```

### Export Style
- Use **default exports** for modules.
  - Example:
    ```typescript
    const formatMessage = () => { /* ... */ };
    export default formatMessage;
    ```

### Commit Patterns
- Commit messages are **freeform** and may include custom prefixes.
- Average commit message length: ~27 characters.
  - Example: `fix: handle empty message case`

## Workflows

### Starting the Development Server
**Trigger:** When you want to run the app locally for development.
**Command:** `/dev-start`

1. Ensure dependencies are installed: `npm install`
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:3000`

### Building for Production
**Trigger:** When preparing a production-ready build.
**Command:** `/build-prod`

1. Build the Next.js project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Running Tests
**Trigger:** To verify code correctness and catch regressions.
**Command:** `/test-run`

1. Run the test suite:
   ```bash
   npm test
   ```
2. Test files follow the `*.test.*` pattern.
   - Example: `messageFormatter.test.ts`

## Testing Patterns

- Test files are named using the `*.test.*` convention.
  - Example: `utils.test.ts`
- The specific testing framework is **unknown**, but standard Node.js/TypeScript test runners (like Jest or Vitest) are likely.
- Place test files alongside the modules they test or in a dedicated `__tests__` directory.

Example test file:
```typescript
// messageFormatter.test.ts
import formatMessage from '@/utils/messageFormatter';

test('formats message correctly', () => {
  expect(formatMessage('hello')).toBe('Hello!');
});
```

## Commands

| Command      | Purpose                                 |
|--------------|-----------------------------------------|
| /dev-start   | Start the development server            |
| /build-prod  | Build and run the app for production    |
| /test-run    | Run the test suite                      |
```
