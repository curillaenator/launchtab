import React, { FC } from 'react';
// import { Corners } from '@launch-ui/shape';
import styled from 'styled-components';

// import { useAppDispatch, useAppSelector } from '@src/hooks';

const AsideStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.modals.matte};
  --shp-bdc: transparent;
  /* --form-bdrs: calc(24px * 1.25 + 3px); */
  --form-bdrs: 24px;

  position: relative;
  width: 384px;
  height: 100%;
  padding: 32px;
  border-radius: 0 var(--form-bdrs) var(--form-bdrs) 0;
  background-color: ${({ theme }) => theme.modals.matte};
`;

export const Aside: FC = ({}) => {
  // const appDispatch = useAppDispatch();

  return <AsideStyled>{/* <Corners borderRadius={24} corners={['tr', 'br']} /> */}</AsideStyled>;
};
