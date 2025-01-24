"use client";

import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { PhotoCard } from "../components";
import { useInfiniteScroller, usePexelsPhotos } from "../hooks";
import { DEFAULT_PAGE, keyMaker, SMALL_SIZE_IMG_SCALE_FACTOR } from "../utils";

const PHOTO_PREFIX = "PHOTO";

const PhotosSection = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.tablet};
  padding: 16px 0;
  max-height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;

  @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
    padding: 48px 0;
  }
`;
const MasonryGrid = styled.div`
  column-count: 1;
  column-gap: 16px;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
    column-count: 2;
  }

  @media (min-width: ${({ theme }) => theme.mediaQueries.desktop}) {
    column-count: 3;
  }
`;
const notificationStyles = css`
  font-size: calc(${({ theme }) => theme.fontSizes.xl} / 1.5);
  text-align: center;
`;
const Notification = styled.h6`
  ${notificationStyles}
`;
const NotificationError = styled.h6`
  ${notificationStyles}
  color: ${({ theme }) => theme.colors.error};
`;

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
    return <Notification>Please wait, feed is being loaded...</Notification>;
  }
  if (error) {
    return (
      <NotificationError>Failed to load the feed: {error}</NotificationError>
    );
  }
  if (photos.length === 0) {
    return (
      <Notification>
        Your feed is empty. New interesting content is coming!
      </Notification>
    );
  }

  return (
    <PhotosSection ref={containerRef}>
      <MasonryGrid>
        {photos.map(({ src, width, height, ...rest }) => (
          <PhotoCard
            key={photoKeyGenerator.next().value}
            {...rest}
            width={width / SMALL_SIZE_IMG_SCALE_FACTOR}
            height={height / SMALL_SIZE_IMG_SCALE_FACTOR}
            url={src.tiny}
          />
        ))}
      </MasonryGrid>
      {hasMorePhotos && <Notification ref={loaderRef}>Loading...</Notification>}
    </PhotosSection>
  );
};

export default PhotosPage;
