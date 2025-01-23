import { useState, useEffect, useRef } from "react";
import { Photo, ErrorResponse } from "pexels";
import { pexelsClient, isPhotoType } from "../utils";

type ServerErrorResponse = { code?: string };
type PexelsPhotoProps = {
  id: number;
};

/**
 * This hook fetches Pexels Photo by Id
 * @param {number} id - Photo id
 * @example
 * // returns {photo: {id: 1, url: 'some-url', ...}, error: false, isLoading: false}
 * usePexelsPhoto({
    id: 1,
  })
 * @returns {{
        photo: Photo | undefined,
        error: string | undefined,
        isLoading: boolean
    }}
 */
export function usePexelsPhoto({ id }: PexelsPhotoProps) {
  const [photo, setPhoto] = useState<Photo | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (id === 0 || !firstRenderRef.current) {
      return;
    }

    const fetchPhoto = async () => {
      setIsLoading(true);
      try {
        firstRenderRef.current = false;
        const photoData: Photo | ErrorResponse = await pexelsClient.photos.show(
          { id },
        );

        if (isPhotoType(photoData)) {
          setPhoto(photoData);
        } else {
          setError(photoData.error);
        }
      } catch (fetchError: unknown) {
        setError(
          (fetchError as ServerErrorResponse)?.code ?? "Issue on Pexels side",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  return { photo, error, isLoading };
}
