"use client";

import { memo } from "react";
import Image from "next/image";
import styled from "styled-components";
import { imageLoader } from "../../../utils";

type PhotoProps = {
  url?: string;
  photographer: string;
  width: number;
  height: number;
  maximized?: boolean;
};
const PhotoContainer = styled.article.withConfig({
  shouldForwardProp: (prop) => prop !== "maximized",
})<{ maximized?: boolean }>`
  width: 300px;
  max-height: 400px;
  overflow: hidden;

  ${({ maximized }) =>
    maximized &&
    `
      width: unset;
    `}
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  display: block;
`;

const PhotoInitials = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors["gray-2"]};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors["gray-2"]};
  padding: 3px 2px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors["gray-3"]};
`;

/**
 * Photo - displays photo if provided otherwise photographer's name initials
 * @param {string} url - Photo's url
 * @param {string} photographer - Photographer's full name
 * @param {number} width - Photo's width
 * @param {number} height - Photo's height
 * @param {boolean} maximized - Maximized view mode(limited on 300px by default)
 * @returns {JSX.Element}
 */
const Photo = memo(
  ({ url, photographer, width, height, maximized = false }: PhotoProps) => {
    const initials = photographer
      .split(" ")
      .reduce((acc, partOfName) => acc + partOfName[0], "");

    return (
      <PhotoContainer {...(maximized ? { maximized } : {})}>
        {url ? (
          <StyledImage
            src={url}
            alt={`${photographer}'s photo`}
            width={width}
            height={height}
            loader={imageLoader}
            unoptimized
            priority
          />
        ) : (
          <PhotoInitials>{initials}</PhotoInitials>
        )}
      </PhotoContainer>
    );
  },
);

Photo.displayName = "Photo";

export default Photo;
