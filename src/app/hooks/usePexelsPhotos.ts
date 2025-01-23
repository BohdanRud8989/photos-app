import { useCallback, useState } from "react";
import type { Photo, ErrorResponse, Photos } from "pexels";
import { pexelsClient, isPhotosType, PAGE_OFFSET } from "../utils";

/**
 * This hook fetches Pexels Photos for specified page in fetchPhotos
 * @example
 * // returns {photos: [{id: 1, url: 'some-url', ...}], error: false, isLoading: false,
 * // hasMorePhotos: true, fetchPhotos: (page: number, concatResult?: boolean) => Promise<void>}
 * usePexelsPhotos()
 * @returns {{
        photos: Photo[],
        error: string | undefined,
        isLoading: boolean,
        hasMorePhotos: boolean,
        fetchPhotos: (page: number, concatResult?: boolean) => Promise<void>,
    }}
 */
export function usePexelsPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMorePhotos, setHasMorePhotos] = useState<boolean>(false);

  const fetchPhotosCallback = useCallback(
    async (page: number, concatResult = true) => {
      try {
        setIsLoading(true);
        const photosWithTotalResults: Photos | ErrorResponse =
          await pexelsClient.photos.curated({
            per_page: PAGE_OFFSET,
            page,
          });

        if (isPhotosType(photosWithTotalResults)) {
          setPhotos((prevPhotos) => [
            ...(concatResult ? prevPhotos : []),
            ...photosWithTotalResults.photos,
          ]);
          setHasMorePhotos(photosWithTotalResults.next_page !== undefined);
        } else {
          setError(photosWithTotalResults.error);
        }
      } catch (fetchError: unknown) {
        setError(
          (fetchError as { message?: string }).message ??
            "Failed to load Pexels photo",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    photos,
    error,
    isLoading,
    hasMorePhotos,
    fetchPhotos: fetchPhotosCallback,
  };
}
