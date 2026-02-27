# ⚛️ React Patterns & Best Practices

A curated collection of React patterns I use in production — with interactive demos, tests, and explanations.

Built while studying **UCSD Extension Front-End Development** and building [HireMe AI](https://hireme-ai-rust.vercel.app).

## Live Demo

```bash
npm install
npm run dev     # http://localhost:5173
```

## Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| 🎣 Custom Hooks | Extract reusable stateful logic | [`useDebounce`](src/hooks/useDebounce.ts), [`useLocalStorage`](src/hooks/useLocalStorage.ts), [`useMediaQuery`](src/hooks/useMediaQuery.ts), [`useClickOutside`](src/hooks/useClickOutside.ts), [`useToggle`](src/hooks/useToggle.ts) |
| 🧱 Compound Components | Flexible component APIs via Context | [`Tabs`](src/components/Tabs/index.tsx) |
| 🔄 Render Props | Share behavior, delegate rendering | [`DataFetcher`](src/components/DataFetcher.tsx) |
| 🛡️ Error Boundaries | Graceful error handling with fallback UI | [`ErrorBoundary`](src/components/ErrorBoundary.tsx) |
| 📦 Container / Presenter | Separate data logic from UI | [`UserProfile`](src/components/UserProfile/) |
| ⚡ Lazy Loading | Code splitting per route | [`LazyRoutes`](src/routes/LazyRoutes.tsx) |

## Custom Hooks

| Hook | Purpose |
|------|---------|
| `useDebounce` | Debounce a value by delay — search inputs, API calls |
| `useFetch` | Generic data fetching with loading/error states |
| `useLocalStorage` | Persist state in localStorage |
| `useMediaQuery` | Reactive CSS media query matching |
| `useClickOutside` | Detect clicks outside a ref — modals, dropdowns |
| `useToggle` | Simple boolean toggle |

## Tech Stack

- **React 18** + TypeScript
- **Vite** — fast dev server & bundler
- **Vitest** + Testing Library — unit tests
- **TailwindCSS** — utility-first styling

## Running Tests

```bash
npm test           # run all tests once
npm run test:watch # watch mode
```

## Project Structure

```
src/
├── components/
│   ├── Tabs/              # Compound component pattern
│   ├── UserProfile/       # Container/Presenter pattern
│   ├── DataFetcher.tsx    # Render props pattern
│   └── ErrorBoundary.tsx  # Error boundary pattern
├── hooks/
│   ├── useDebounce.ts     # Debounce hook
│   ├── useFetch.ts        # Data fetching hook
│   ├── useLocalStorage.ts # localStorage sync hook
│   ├── useMediaQuery.ts   # Media query hook
│   ├── useClickOutside.ts # Click outside hook
│   └── useToggle.ts       # Toggle hook
├── pages/                 # Lazy-loaded route pages
├── routes/                # Lazy loading pattern
├── App.tsx                # Interactive demo app
└── main.tsx               # Entry point
```

## What I Learned

- **Custom hooks** are the most powerful pattern in React — they share stateful logic without changing component hierarchy
- **TypeScript generics** make components type-safe and developer-friendly
- **Error boundaries** should wrap routes or features, not the entire app
- **Lazy loading** reduced initial bundle by ~40% in production apps
- **Container/Presenter** makes components trivial to test and reuse

## License

MIT
