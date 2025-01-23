"use client";

import { useEffect, useRef, useState } from "react";
import { PhotoCard } from "../components";
import { useInfiniteScroller, usePexelsPhotos } from "../hooks";
import { DEFAULT_PAGE, keyMaker, SMALL_SIZE_IMG_SCALE_FACTOR } from "../utils";

import "./page.scss";

const PHOTO_PREFIX = "PHOTO";

/**
 * Photos Page with infinite scroller
 * @returns {JSX.Element}
 */
const PhotosPage = () => {
  const photoKeyGenerator = keyMaker(PHOTO_PREFIX);
  const [areFirstPhotosLoading, setAreFirstPhotosLoading] = useState(true);
  const firstPageRenderRef = useRef(true);
  const {
    photos,
    error,
    isLoading: areMorePhotosLoading,
    hasMorePhotos,
    fetchPhotos,
  } = usePexelsPhotos();
  const { containerRef, loaderRef } = useInfiniteScroller({
    fetchMoreCallback: fetchPhotos,
    skip: photos.length === 0 || areMorePhotosLoading,
  });

  // Initial fetch of photos list
  useEffect(() => {
    if (!firstPageRenderRef.current) {
      return;
    }

    const fetchPhotosWrapper = async () => {
      try {
        setAreFirstPhotosLoading(true);
        firstPageRenderRef.current = false;
        await fetchPhotos(DEFAULT_PAGE, false);
      } finally {
        setAreFirstPhotosLoading(false);
      }
    };

    fetchPhotosWrapper();
  }, [fetchPhotos]);

  if (areFirstPhotosLoading) {
    return (
      <h6 className="photos-feed-page__notification">
        Please wait, feed is being loaded...
      </h6>
    );
  }
  if (error) {
    return (
      <h6 className="photos-feed-page__notification photos-feed-page__notification--error">
        Failed to load the feed: {error}
      </h6>
    );
  }
  if (photos.length === 0) {
    return (
      <h6 className="photos-feed-page__notification">
        Your feed is empty. New interesting content is coming!
      </h6>
    );
  }

  return (
    <div className="photos-feed-page" ref={containerRef}>
      <section className="photos-feed-page__masonry-grid">
        {photos.map(({ src, width, height, ...rest }) => (
          <PhotoCard
            key={photoKeyGenerator.next().value}
            {...rest}
            width={width / SMALL_SIZE_IMG_SCALE_FACTOR}
            height={height / SMALL_SIZE_IMG_SCALE_FACTOR}
            url={src.tiny}
          />
        ))}
      </section>
      {hasMorePhotos && (
        <span className="photos-feed-page__notification" ref={loaderRef}>
          Loading...
        </span>
      )}
    </div>
  );
};

export default PhotosPage;
