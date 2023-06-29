import React, { FC, useEffect } from 'react';
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

const DynamicWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

interface BackgroundProps {
  setMouseWatcher: (watcher: (e: React.MouseEvent<Element, MouseEvent>) => void) => void;
}

export const Background: FC<BackgroundProps> = (props) => {
  const { setMouseWatcher } = props;

  const wallpaper = useAppSelector((state) => state.settings.lookfeel.wallpaper);
  const isDynamicWallpaper = useAppSelector((state) => state.settings.lookfeel.isDynamicWallpaper);

  const { watchMouse, layerRotation, positionStyles } = useCloudsPositionStyle();

  useEffect(() => {
    if (isDynamicWallpaper) setMouseWatcher(watchMouse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDynamicWallpaper]);

  if (isDynamicWallpaper) {
    return (
      <DynamicWrapper>
        <div style={layerRotation} className='content'>
          <Clouds positionStyles={positionStyles} />
        </div>
      </DynamicWrapper>
    );
  }

  if (!wallpaper) return <BackgroundStyled />;

  return (
    <BackgroundStyled>
      <img className='background' src={wallpaper} alt='' />
    </BackgroundStyled>
  );
};
