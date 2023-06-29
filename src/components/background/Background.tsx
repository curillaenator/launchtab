import React, { FC } from 'react';
import { Clouds, useCloudsPositionStyle } from '@launch-ui/dynamic-bg';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/hooks';

const BackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -50;
  background-color: ${({ theme }) => theme.backgrounds.light};

  .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Background: FC<Partial<ReturnType<typeof useCloudsPositionStyle>>> = (props) => {
  const { layerRotation, positionStyles } = props;

  const wallpaper = useAppSelector((state) => state.settings.lookfeel.wallpaper);
  const isDynamicWallpaper = useAppSelector((state) => state.settings.lookfeel.isDynamicWallpaper);

  if (isDynamicWallpaper) {
    return (
      <div className='dynamic-bg'>
        <div className='dynamic-bg-content' style={layerRotation}>
          <Clouds positionStyles={positionStyles} />
        </div>
      </div>
    );
  }

  if (!wallpaper) return <BackgroundStyled />;

  return (
    <BackgroundStyled>
      <img className='background' src={wallpaper} alt='' />
    </BackgroundStyled>
  );
};
