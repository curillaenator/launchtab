import React, { FC } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../hooks/hooks";

const BackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -50;
  background-color: ${({ theme }) => theme.background};

  .background {
    width: 120%;
    height: 120%;
    margin-left: -10%;
    margin-top: -10%;
    object-fit: cover;
    filter: blur(24px) opacity(0.4) brightness(0.92);
  }
`;

export const Background: FC = () => {
  const { wallpaper } = useAppSelector((state) => state.settings.lookfeel);

  if (!wallpaper) return <BackgroundStyled />;

  return (
    <BackgroundStyled>
      <img className="background" src={wallpaper} alt="" />
    </BackgroundStyled>
  );
};
