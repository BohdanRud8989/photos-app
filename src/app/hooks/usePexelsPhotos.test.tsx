import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { usePexelsPhotos } from "./usePexelsPhotos";

const SUCCESS_FETCH_PAGE = 1;
const INVALID_DATA_FETCH_PAGE = 2;
const ERROR_FETCH_PAGE = 3;
const ERROR_TEXT = "Issue on Pexels side";
const PHOTOS_SUCCESS_RESPONSE = [
  {
    id: 1,
    url: "https://example.com/photo.jpg",
    photographer: "John Doe",
  },
  {
    id: 2,
    url: "https://example.com/photo-2.jpg",
    photographer: "Li Yang",
  },
];

vi.mock("../utils", () => ({
  pexelsClient: {
    photos: {
      curated: vi.fn().mockImplementation(({ page }) => {
        if (page === SUCCESS_FETCH_PAGE) {
          return Promise.resolve({
            photos: PHOTOS_SUCCESS_RESPONSE,
            next_page: "some-url",
          });
        } else if (page === INVALID_DATA_FETCH_PAGE) {
          return Promise.resolve({ error: ERROR_TEXT });
        } else {
          return Promise.reject({ message: ERROR_TEXT });
        }
      }),
    },
  },
  isPhotosType: vi.fn().mockImplementation(({ error }) => error === undefined),
  PAGE_OFFSET: 2,
}));

describe("usePexelsPhotos hook", () => {
  test("fetches list of photos and sets data on success", async () => {
    const { result, rerender } = renderHook(() => usePexelsPhotos());

    await act(async () => {
      await result.current.fetchPhotos(SUCCESS_FETCH_PAGE);
    });

    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.hasMorePhotos).toBe(true);
    expect(result.current.photos).toEqual(PHOTOS_SUCCESS_RESPONSE);
  });

  test("fetches list of photos: concatenates to previous list either fully replace it", async () => {
    const { result, rerender } = renderHook(() => usePexelsPhotos());

    await act(async () => {
      await result.current.fetchPhotos(SUCCESS_FETCH_PAGE);
    });

    rerender();

    expect(result.current.photos).toEqual(PHOTOS_SUCCESS_RESPONSE);

    await act(async () => {
      await result.current.fetchPhotos(SUCCESS_FETCH_PAGE);
    });

    expect(result.current.photos).toEqual([
      ...PHOTOS_SUCCESS_RESPONSE,
      ...PHOTOS_SUCCESS_RESPONSE,
    ]);

    //  Replace previous list of photos with new one
    await act(async () => {
      await result.current.fetchPhotos(SUCCESS_FETCH_PAGE, false);
    });

    expect(result.current.photos).toEqual(PHOTOS_SUCCESS_RESPONSE);
  });

  test("handles invalid photos data response", async () => {
    const { result, rerender } = renderHook(() => usePexelsPhotos());

    await act(async () => {
      await result.current.fetchPhotos(INVALID_DATA_FETCH_PAGE);
    });

    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.photos).toHaveLength(0);
    expect(result.current.hasMorePhotos).toBe(false);
    expect(result.current.error).toBe(ERROR_TEXT);
  });

  test("sets error on fetch failure", async () => {
    const { result, rerender } = renderHook(() => usePexelsPhotos());

    await act(async () => {
      await result.current.fetchPhotos(ERROR_FETCH_PAGE);
    });

    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.photos).toHaveLength(0);
    expect(result.current.hasMorePhotos).toBe(false);
    expect(result.current.error).toBe(ERROR_TEXT);
  });
});
