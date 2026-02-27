import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";
import { describe, it, expect, vi } from "vitest";

function ThrowError() {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  // Suppress React error boundary console.error in tests
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});

  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("Safe content")).toBeInTheDocument();
  });

  it("renders fallback on error", () => {
    render(
      <ErrorBoundary fallback={<p>Fallback UI</p>}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Fallback UI")).toBeInTheDocument();
  });

  it("renders default error message", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  spy.mockRestore();
});
