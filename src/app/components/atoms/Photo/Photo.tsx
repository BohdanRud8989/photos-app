import { memo } from "react";
import cx from "classnames";
import Image from "next/image";
import { imageLoader } from "../../../utils";

import "./photo.scss";

type PhotoProps = {
  url?: string;
  photographer: string;
  width: number;
  height: number;
  maximized?: boolean;
};
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
      <div className={cx("photo", { "photo--maximized": maximized })}>
        {url ? (
          <Image
            className="photo__image"
            src={url}
            alt={`${photographer}'s photo`}
            width={width}
            height={height}
            loader={imageLoader}
            unoptimized
            priority
          />
        ) : (
          <div className="photo__initials">{initials}</div>
        )}
      </div>
    );
  },
);

Photo.displayName = "Photo";

export default Photo;
