"use client";

import { useRouter } from "next/navigation";
import { PhotoCard } from "../../components";
import { usePexelsPhoto } from "../../hooks";
import { MEDIUM_SIZE_IMG_SCALE_FACTOR } from "../../utils";

import "./page.scss";

type PhotoProps = {
  params: { id: number };
};

/**
 * Photo Details Page
 * @returns {JSX.Element}
 */
const Photo = ({ params: { id } }: PhotoProps) => {
  const router = useRouter();
  const { photo, error, isLoading } = usePexelsPhoto({ id });

  const handleRedirectBack = () => {
    router.push("/photos", { scroll: false });
  };

  if (isLoading) {
    return (
      <h6 className="photo-page__notification">
        Please wait, photo is being loaded...
      </h6>
    );
  }
  if (error) {
    return (
      <h6 className="photo-page__notification photo-page__notification--error">
        Failed to load photo: {error}
      </h6>
    );
  }

  return (
    <section className="photo-page">
      {photo !== undefined && (
        <>
          <PhotoCard
            {...photo}
            url={photo.src.medium}
            width={photo.width / 5}
            height={photo.height / MEDIUM_SIZE_IMG_SCALE_FACTOR}
            extended
          />
          <button onClick={handleRedirectBack}>
            <span className="photo-page__back-btn-text">Back</span>
          </button>
        </>
      )}
    </section>
  );
};

export default Photo;
