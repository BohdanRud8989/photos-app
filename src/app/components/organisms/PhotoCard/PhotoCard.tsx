"use client";

import cx from "classnames";
import { useRouter } from "next/navigation";
import type { Photo as PexelsPhoto } from "pexels";
import { Photo } from "../../atoms";

import "./photoCard.scss";

type PhotoCardProps = {
  className?: string;
  extended?: boolean;
  url?: string;
} & Omit<PexelsPhoto, "src">;

/**
 * Photo card - displays photo along with info
 * @param {string} className - alternative css class name of the main container
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
  className,
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
    <article
      className={cx(
        "photo-card",
        { "photo-card--extended": extended },
        className,
      )}
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
          <span className="photo-card__photographer">{photographer}</span>
          <p className="photo-card__description">{description}</p>
        </>
      )}
    </article>
  );
};

export default PhotoCard;
