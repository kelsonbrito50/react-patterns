import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab components must be used within <Tabs>");
  return context;
}

/**
 * Compound component pattern for flexible tab interfaces.
 *
 * @example
 * <Tabs defaultTab="overview">
 *   <Tabs.List>
 *     <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
 *     <Tabs.Trigger value="code">Code</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="overview">Overview content here</Tabs.Content>
 *   <Tabs.Content value="code">Code content here</Tabs.Content>
 * </Tabs>
 */
export function Tabs({
  defaultTab,
  children,
}: {
  defaultTab: string;
  children: ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabList({ children }: { children: ReactNode }) {
  return <div className="flex border-b border-gray-200 gap-1">{children}</div>;
};

Tabs.Trigger = function TabTrigger({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

Tabs.Content = function TabContent({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <div className="py-4">{children}</div>;
};
