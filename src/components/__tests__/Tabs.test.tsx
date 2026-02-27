import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../Tabs";
import { describe, it, expect } from "vitest";

describe("Tabs", () => {
  it("renders default tab content", () => {
    render(
      <Tabs defaultTab="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs>
    );
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });

  it("switches tabs on click", () => {
    render(
      <Tabs defaultTab="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
        <Tabs.Content value="b">Content B</Tabs.Content>
      </Tabs>
    );
    fireEvent.click(screen.getByText("Tab B"));
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });

  it("highlights active trigger", () => {
    render(
      <Tabs defaultTab="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs>
    );
    expect(screen.getByText("Tab A").className).toContain("text-blue-600");
    expect(screen.getByText("Tab B").className).toContain("text-gray-500");
  });
});
