import React, { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Tabs } from "./components/Tabs";
import { DataFetcher } from "./components/DataFetcher";
import { UserProfilePresenter } from "./components/UserProfile";
import { useDebounce } from "./hooks/useDebounce";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

/** Demo app showcasing all React patterns */
export function App() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [activeDemo, setActiveDemo] = useState<string>("tabs");

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        ⚛️ React Patterns
      </h1>
      <p className="text-gray-500 mb-8">
        Interactive demos of production-ready React patterns
      </p>

      {/* Navigation */}
      <nav className="flex flex-wrap gap-2 mb-8">
        {["tabs", "hooks", "container", "render-props", "error-boundary", "lazy"].map(
          (demo) => (
            <button
              key={demo}
              onClick={() => setActiveDemo(demo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeDemo === demo
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
            >
              {demo}
            </button>
          )
        )}
      </nav>

      {/* Demos */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {activeDemo === "tabs" && <TabsDemo />}
        {activeDemo === "hooks" && (
          <HooksDemo
            search={search}
            setSearch={setSearch}
            debouncedSearch={debouncedSearch}
          />
        )}
        {activeDemo === "container" && <ContainerDemo />}
        {activeDemo === "render-props" && <RenderPropsDemo />}
        {activeDemo === "error-boundary" && <ErrorBoundaryDemo />}
        {activeDemo === "lazy" && <LazyDemo />}
      </div>
    </div>
  );
}

/* ─── Demo Components ──────────────────────────────────── */

function TabsDemo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🧱 Compound Components — Tabs</h2>
      <p className="text-gray-500 text-sm mb-4">
        Flexible API using Context + composition. Parent controls state, children render.
      </p>
      <Tabs defaultTab="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="code">Code</Tabs.Trigger>
          <Tabs.Trigger value="tests">Tests</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          <p>Compound components let consumers compose flexible UIs without prop drilling.</p>
        </Tabs.Content>
        <Tabs.Content value="code">
          <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">...</Tabs.Content>
</Tabs>`}
          </pre>
        </Tabs.Content>
        <Tabs.Content value="tests">
          <p>✅ 4 tests covering render, switching, error on orphaned trigger</p>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}

function HooksDemo({
  search,
  setSearch,
  debouncedSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
  debouncedSearch: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🎣 Custom Hooks — useDebounce</h2>
      <p className="text-gray-500 text-sm mb-4">
        Type fast — the debounced value only updates after 300ms of inactivity.
      </p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type something..."
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <div className="mt-3 text-sm space-y-1">
        <p>
          Raw: <code className="bg-gray-100 px-1 rounded">{search || "(empty)"}</code>
        </p>
        <p>
          Debounced:{" "}
          <code className="bg-blue-50 text-blue-700 px-1 rounded">
            {debouncedSearch || "(empty)"}
          </code>
        </p>
      </div>
    </div>
  );
}

function ContainerDemo() {
  const mockUser = {
    name: "Kelson Brito",
    email: "kelson@example.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=KB",
    role: "Full Stack Developer",
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📦 Container / Presenter</h2>
      <p className="text-gray-500 text-sm mb-4">
        Container handles data — Presenter handles UI. Easy to test and reuse.
      </p>
      <UserProfilePresenter user={mockUser} />
    </div>
  );
}

function RenderPropsDemo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🔄 Render Props — DataFetcher</h2>
      <p className="text-gray-500 text-sm mb-4">
        Generic data fetcher that delegates rendering via children function.
      </p>
      <DataFetcher<{ id: number; title: string }[]>
        url="https://jsonplaceholder.typicode.com/posts?_limit=5"
      >
        {(posts) => (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.id} className="p-3 bg-gray-50 rounded">
                <span className="text-gray-400 mr-2">#{post.id}</span>
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </DataFetcher>
    </div>
  );
}

function BuggyComponent(): React.ReactElement {
  throw new Error("💥 This component crashed on purpose!");
}

function ErrorBoundaryDemo() {
  const [showBug, setShowBug] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🛡️ Error Boundary</h2>
      <p className="text-gray-500 text-sm mb-4">
        Catches JavaScript errors and shows a fallback UI instead of crashing.
      </p>
      <button
        onClick={() => setShowBug(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4"
      >
        Trigger Error
      </button>
      {showBug && (
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      )}
    </div>
  );
}

function LazyDemo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">⚡ Lazy Loading</h2>
      <p className="text-gray-500 text-sm mb-4">
        Components loaded on demand using React.lazy + Suspense.
      </p>
      <Suspense fallback={<p className="text-gray-400">Loading Dashboard...</p>}>
        <div className="p-3 bg-gray-50 rounded mb-2">
          <Dashboard />
        </div>
      </Suspense>
      <Suspense fallback={<p className="text-gray-400">Loading Settings...</p>}>
        <div className="p-3 bg-gray-50 rounded">
          <Settings />
        </div>
      </Suspense>
    </div>
  );
}
