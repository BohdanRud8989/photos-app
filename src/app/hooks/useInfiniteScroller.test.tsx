import { renderHook, act } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import { useInfiniteScroller } from "./useInfiniteScroller";

describe("useInfiniteScroller", () => {
  test("should call callback on scroll", async () => {
    const mockFetchMoreCallback = vi.fn();
    const containerRefMocked = document.createElement("div");
    containerRefMocked.setAttribute(
      "style",
      "overflow-y: scroll; height: 100px;",
    );
    const loaderRefMocked = document.createElement("span");
    loaderRefMocked.textContent = "Loading";
    loaderRefMocked.setAttribute("style", "height: 300px;");

    containerRefMocked.appendChild(loaderRefMocked);

    const { result, rerender } = renderHook(() =>
      useInfiniteScroller({ fetchMoreCallback: mockFetchMoreCallback }),
    );
    const { page, containerRef, loaderRef } = result.current;

    act(() => {
      containerRef.current = containerRefMocked;
      loaderRef.current = loaderRefMocked;
    });
    rerender();

    expect(page).toBe(1);
    expect(containerRef).toStrictEqual({ current: containerRefMocked });
    expect(loaderRef).toStrictEqual({ current: loaderRefMocked });
    expect(mockFetchMoreCallback).toHaveBeenCalledTimes(0);
  });
});
