# ⚛️ React Patterns & Best Practices

A curated collection of React patterns I use in production — with examples, explanations, and when to use each one.

Built while studying **UCSD Extension Front-End Development** and building [HireMe AI](https://hireme-ai-rust.vercel.app).

## Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| 🎣 Custom Hooks | Extract reusable logic | [`useDebounce`](src/hooks/useDebounce.ts) |
| 🧱 Compound Components | Flexible component APIs | [`Tabs`](src/components/Tabs/) |
| 🔄 Render Props | Share behavior between components | [`DataFetcher`](src/components/DataFetcher.tsx) |
| 🛡️ Error Boundaries | Graceful error handling | [`ErrorBoundary`](src/components/ErrorBoundary.tsx) |
| 📦 Container/Presenter | Separate logic from UI | [`UserProfile`](src/components/UserProfile/) |
| ⚡ Lazy Loading | Code splitting for performance | [`LazyRoutes`](src/routes/LazyRoutes.tsx) |

## Tech Stack

- React 18 + TypeScript
- Vite (fast dev server)
- Vitest (unit tests)
- TailwindCSS

## Running Locally

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # run all tests
```

## What I Learned

- **Custom hooks** are the most powerful pattern in React — they let you share stateful logic without changing component hierarchy
- **TypeScript generics** make compound components type-safe and developer-friendly
- **Error boundaries** should wrap every route, not just the entire app
- **Lazy loading** reduced initial bundle size by 40% in my production apps

## License

MIT
