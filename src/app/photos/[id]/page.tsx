"use client";

import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import { PhotoCard } from "../../components";
import { usePexelsPhoto } from "../../hooks";
import { MEDIUM_SIZE_IMG_SCALE_FACTOR } from "../../utils";

type PhotoProps = {
  params: { id: number };
};

const PhotoSection = styled.section`
  display: flex;
  flex-flow: column;
  gap: ${({ theme }) => theme.spacings.tablet};
  align-items: center;
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
const BackButtonText = styled.span`
  text-transform: uppercase;
`;

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
    return <Notification>Please wait, photo is being loaded...</Notification>;
  }
  if (error) {
    return <NotificationError>Failed to load photo: {error}</NotificationError>;
  }

  return (
    <PhotoSection>
      {photo !== undefined && (
        <>
          <PhotoCard
            {...photo}
            url={photo.src.medium}
            width={photo.width / MEDIUM_SIZE_IMG_SCALE_FACTOR}
            height={photo.height / MEDIUM_SIZE_IMG_SCALE_FACTOR}
            extended
          />
          <button onClick={handleRedirectBack}>
            <BackButtonText>Back</BackButtonText>
          </button>
        </>
      )}
    </PhotoSection>
  );
};

export default Photo;
