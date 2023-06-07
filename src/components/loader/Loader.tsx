import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { icons } from '@src/assets/icons';

interface ILoaderStyled {
  fs: boolean;
}

const LoaderStyled = styled.div<ILoaderStyled>`
  position: ${({ fs }) => (fs ? 'absolute' : 'relative')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ fs }) => (fs ? '100vw' : '100%')};
  height: ${({ fs }) => (fs ? '100vh' : '100%')};

  .svg_loader {
    width: 6rem;
    height: 6rem;
  }
`;

interface ILoader {
  icon?: ReactNode;
  fullscreen?: boolean;
}

export const Loader: FC<ILoader> = ({ icon = icons.loader, fullscreen = false }) => {
  return <LoaderStyled fs={fullscreen}>{icon}</LoaderStyled>;
};
