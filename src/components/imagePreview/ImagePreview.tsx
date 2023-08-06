import React, { FC, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ImagePreviewProps extends ImgHTMLAttributes<HTMLImageElement> {
  clickable?: boolean;
  active?: boolean;
  avgColor?: string;
}

const ImagePreviewStyled = styled.div<ImagePreviewProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 350px;
  aspect-ratio: 16 / 9;
  border-radius: 18px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgrounds.base};
  transition: 0.12s ease-in-out;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  border: ${({ active }) => (active ? '8px' : '0px')} solid
    ${({ theme, active, avgColor }) => (active ? avgColor || theme.backgrounds.light : 'transparent')};

  &:hover {
    opacity: ${({ clickable }) => (clickable ? 0.5 : 1)};
  }

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &_active {
    }
  }
`;

export const ImagePreview: FC<ImagePreviewProps> = (props) => {
  const { src, alt, active, clickable, avgColor, ...rest } = props;

  return (
    <ImagePreviewStyled active={active} clickable={clickable} avgColor={avgColor}>
      {src && <img {...rest} className='preview-image' src={src} alt={alt} draggable={false} />}
    </ImagePreviewStyled>
  );
};
