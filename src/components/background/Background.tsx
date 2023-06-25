import React, { FC } from 'react';
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

export const Background: FC = () => {
  const wallpaper = useAppSelector((state) => state.settings.lookfeel.wallpaper);

  if (!wallpaper) return <BackgroundStyled />;

  return (
    <BackgroundStyled>
      <img className='background' src={wallpaper} alt='' />
    </BackgroundStyled>
  );
};
