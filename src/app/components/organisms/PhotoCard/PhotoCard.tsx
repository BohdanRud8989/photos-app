"use client";

import { useRouter } from "next/navigation";
import type { Photo as PexelsPhoto } from "pexels";
import styled from "styled-components";
import { Photo } from "../../atoms";

type PhotoCardProps = {
  extended?: boolean;
  url?: string;
} & Omit<PexelsPhoto, "src">;

const PhotoCardContainer = styled.article.withConfig({
  shouldForwardProp: (prop) => prop !== "extended",
})<{ extended?: boolean }>`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 16px;
  gap: ${({ theme }) => theme.spacings.mobile};
  padding: 16px;
  border-radius: ${({ theme }) => theme.borders["radius-1"]};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors["gray-3"]};
  cursor: pointer;
  break-inside: avoid;

  @media (min-width: ${({ theme }) => theme.mediaQueries.tabletPortrait}) {
    gap: ${({ theme }) => theme.spacings.tablet};
  }

  ${({ extended, theme }) =>
    extended &&
    `
    cursor: unset;
    margin-bottom: 0;

    @media (min-width: ${theme.mediaQueries.tabletPortrait}) {
      padding: 36px;
    }
    `}
`;

const Photographer = styled.span`
  text-transform: capitalize;
  font-weight: 600;
  color: ${({ theme }) => theme.colors["gray-2"]};
`;

const Description = styled.p`
  flex: 0 0 calc(100% - 48px);
  color: ${({ theme }) => theme.colors["gray-1"]};
  line-height: 1.5;
`;

/**
 * Photo card - displays photo along with info
 * @param {number} id - Photo's id
 * @param {string} url - Photo's url
 * @param {string} photographer - Photographer's name
 * @param {string} description - Description of the photo
 * @param {number} width - Photo's width
 * @param {number} height - Photo's height
 * @param {boolean} extended - Extended view mode(minimised by default)
 * @returns {JSX.Element}
 */
const PhotoCard = ({
  id,
  url,
  photographer,
  alt: description,
  width,
  height,
  extended = false,
}: PhotoCardProps) => {
  const router = useRouter();

  const handleRedirectToPhotoDetailsPage = () => {
    router.push(`/photos/${id}`);
  };

  return (
    <PhotoCardContainer
      extended={extended}
      onClick={handleRedirectToPhotoDetailsPage}
      data-testid="photo-card-test-id"
    >
      <Photo
        url={url}
        photographer={photographer}
        width={width}
        height={height}
        maximized={extended}
      />
      {extended && (
        <>
          <Photographer>{photographer}</Photographer>
          <Description>{description}</Description>
        </>
      )}
    </PhotoCardContainer>
  );
};

export default PhotoCard;
