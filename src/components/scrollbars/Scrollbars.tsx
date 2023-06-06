import React, { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ScrollbarsProps extends PropsWithChildren {
  height: number;
}

const ScrollbarsStyled = styled.div<ScrollbarsProps>`
  overflow-y: auto;
  width: 100%;
  max-height: ${({ height }) => height}px;

  &::-webkit-scrollbar {
    width: 0.25rem;
    margin-left: 0.25rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.shapes.base};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.primary[400]};
    border-radius: 0.25rem;
  }
`;

export const Scrollbars: FC<ScrollbarsProps> = ({ height, children }) => {
  return <ScrollbarsStyled height={height}>{children}</ScrollbarsStyled>;
};
