import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../typography';

const ImagePreviewStyled = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 350px;
  aspect-ratio: 16 / 9;
  /* height: 186px; */
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.backgrounds.light};
  background-color: ${({ theme }) => theme.backgrounds.base};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .disabled {
    opacity: 0.5;
  }
`;

interface ImagePreviewProps {
  imageURL: string;
  disabled?: boolean;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ imageURL, disabled }) => {
  return (
    <ImagePreviewStyled disabled={disabled}>
      {imageURL && <img className='preview-image' src={imageURL} alt='Wallpaper' draggable={false} />}

      {!imageURL && <Typography type='RoundedBold16'>Wallpaper preview</Typography>}
    </ImagePreviewStyled>
  );
};
