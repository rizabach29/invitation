# Testing Documentation

This project uses Jest and React Testing Library for unit and integration testing.

## Test Structure

```
__tests__/
├── app/
│   ├── admin/
│   ├── components/
│   └── sections/
├── components/
│   └── ui/
├── lib/
├── utils/
└── integration/
```

## Test Categories

### Unit Tests

- **Utility Functions**: Testing helper functions and utilities
- **Components**: Testing individual React components
- **Actions**: Testing server actions and API functions

### Integration Tests

- **Page Integration**: Testing complete page rendering
- **Component Integration**: Testing component interactions

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

## Test Coverage

The test suite covers:

- ✅ Utility functions (`lib/utils.ts`)
- ✅ UI Components (`components/ui/button.tsx`)
- ✅ Section Components (`app/(sections)/counter.tsx`)
- ✅ Interactive Components (`app/(components)/music.tsx`)
- ✅ Server Actions (`app/(admin)/login/actions.ts`)
- ✅ Supabase Client (`utils/supabase/client.ts`)
- ✅ Admin Components (`app/(admin)/guests/button-scan.tsx`)
- ✅ Page Integration (`app/page.tsx`)

## Mock Strategy

The tests use comprehensive mocking for:

- Next.js navigation and routing
- Framer Motion animations
- Supabase client
- External libraries (QR scanner, audio)
- Window and browser APIs

## Test Best Practices

1. **Isolation**: Each test is isolated with proper setup/teardown
2. **Mocking**: External dependencies are mocked to ensure reliable tests
3. **Assertions**: Tests use meaningful assertions and test actual behavior
4. **Coverage**: Tests cover both happy path and error scenarios
5. **Maintainability**: Tests are organized and well-documented

## Adding New Tests

When adding new components or features:

1. Create test files following the same directory structure
2. Mock external dependencies appropriately
3. Test both component rendering and user interactions
4. Include error handling and edge cases
5. Update this documentation

## Environment Setup

Tests are configured to run in:

- **jsdom**: For React component tests
- **node**: For server-side function tests

The Jest configuration includes proper TypeScript support and path mapping.
