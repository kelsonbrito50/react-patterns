import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";
import { describe, it, expect, vi } from "vitest";

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("debounces value changes", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 300 } }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 300 });
    expect(result.current).toBe("initial"); // Not yet updated

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("updated");

    vi.useRealTimers();
  });

  it("cancels previous timer on rapid changes", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    act(() => vi.advanceTimersByTime(100));
    rerender({ value: "c" });
    act(() => vi.advanceTimersByTime(300));

    expect(result.current).toBe("c"); // Skipped "b"
    vi.useRealTimers();
  });
});
