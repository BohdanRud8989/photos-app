import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { usePexelsPhoto } from "./usePexelsPhoto";

const SUCCESS_FETCH_PHOTO_ID = 123;
const INVALID_DATA_FETCH_PHOTO_ID = 456;
const ERROR_FETCH_PHOTO_ID = 789;
const ERROR_TEXT = "Issue on Pexels side";

vi.mock("../utils", () => ({
  pexelsClient: {
    photos: {
      show: vi.fn().mockImplementation(({ id }) => {
        if (id === SUCCESS_FETCH_PHOTO_ID) {
          return Promise.resolve({
            id,
            url: "https://example.com/photo.jpg",
            photographer: "John Doe",
          });
        } else if (id === INVALID_DATA_FETCH_PHOTO_ID) {
          return Promise.resolve({ error: ERROR_TEXT });
        } else {
          return Promise.reject({ code: ERROR_TEXT });
        }
      }),
    },
  },
  isPhotoType: vi.fn().mockImplementation(({ error }) => error === undefined),
}));

describe("usePexelsPhoto hook", () => {
  test("fetches photo and sets data on success", async () => {
    const { result, rerender } = renderHook(() =>
      usePexelsPhoto({ id: SUCCESS_FETCH_PHOTO_ID }),
    );

    expect(result.current.isLoading).toBe(true);

    await act(async () => {});

    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.photo).toEqual({
      id: SUCCESS_FETCH_PHOTO_ID,
      url: "https://example.com/photo.jpg",
      photographer: "John Doe",
    });
  });

  test("handles invalid photo data response", async () => {
    const { result, rerender } = renderHook(() =>
      usePexelsPhoto({ id: INVALID_DATA_FETCH_PHOTO_ID }),
    );

    expect(result.current.isLoading).toBe(true);

    await act(async () => {});

    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.photo).toBeUndefined();
    expect(result.current.error).toBe(ERROR_TEXT);
  });

  test("sets error on fetch failure", async () => {
    const { result, rerender } = renderHook(() =>
      usePexelsPhoto({ id: ERROR_FETCH_PHOTO_ID }),
    );

    expect(result.current.isLoading).toBe(true);

    await act(async () => {});

    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.photo).toBeUndefined();
    expect(result.current.error).toBe(ERROR_TEXT);
  });
});
