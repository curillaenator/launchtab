import React, { FC, ImgHTMLAttributes } from 'react';
import { Corners } from '@launch-ui/shape';
import styled from 'styled-components';

interface ImagePreviewProps extends ImgHTMLAttributes<HTMLImageElement> {
  clickable?: boolean;
  active?: boolean;
  avgColor?: string;
}

const ImagePreviewStyled = styled.div<ImagePreviewProps>`
  --shp-bdc: ${({ theme, active, avgColor }) =>
    active ? avgColor || theme.backgrounds.light : theme.backgrounds.light};

  --shp-bgc: transparent;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 350px;
  background-color: transparent;
  transition: 200ms ease-in-out;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  &:hover {
    opacity: ${({ clickable }) => (clickable ? 0.5 : 1)};
  }

  .preview-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: calc(22px * 1.25 + 3px);
    user-select: none;

    &_active {
    }
  }
`;

export const ImagePreview: FC<ImagePreviewProps> = (props) => {
  const { src, alt, active, clickable, avgColor, onClick, ...rest } = props;

  return (
    <ImagePreviewStyled active={active} clickable={clickable} avgColor={avgColor} onClick={onClick}>
      <Corners borderRadius={24} stroke={4} />

      {src && <img {...rest} className='preview-image' src={src} alt={alt} draggable={false} />}
    </ImagePreviewStyled>
  );
};
