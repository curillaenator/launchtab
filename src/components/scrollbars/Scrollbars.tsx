import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ScrollbarsProps extends PropsWithChildren {
  height: string;
  hasFades?: boolean;
}

const FadesStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .fade-top,
  .fade-bottom {
    position: absolute;
    width: calc(100% - 4px);
    height: 56px;
    left: 0;
    z-index: 200;
  }

  .fade-top {
    top: 0;
    background-image: ${({ theme }) => `linear-gradient(to bottom, ${theme.backgrounds.base}, transparent)`};
  }

  .fade-bottom {
    bottom: 0;
    background-image: ${({ theme }) => `linear-gradient(to top, ${theme.backgrounds.base}, transparent)`};
  }
`;

const ScrollbarsStyled = styled.div<ScrollbarsProps>`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: ${({ height }) => height};
  position: relative;

  &::-webkit-scrollbar {
    width: 0.25rem;
    margin-left: 0.25rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.backgrounds.base};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.primary[500]};
    border-radius: 0.25rem;
  }
`;

export const Scrollbars: FC<ScrollbarsProps> = ({ height, hasFades = false, children }) => {
  if (hasFades) {
    return (
      <FadesStyled>
        <div className='fade-top' />

        <ScrollbarsStyled height={height}>{children}</ScrollbarsStyled>

        <div className='fade-bottom' />
      </FadesStyled>
    );
  }

  return <ScrollbarsStyled height={height}>{children}</ScrollbarsStyled>;
};
