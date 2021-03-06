import React, { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

import { useAppSelector } from "../../hooks/hooks";

import { CardImage } from "./CardImage";
import { Typography } from "../typography";

import type { IBookmark } from "../../types/types";

const animation = keyframes`${fadeIn}`;

interface ICardStyled {
  isOpaque: boolean;
  isDeleted?: boolean;
  noAnimation: boolean;
}

const CardStyled = styled.a<ICardStyled>`
  position: relative;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  border-radius: 20px;
  overflow: hidden;
  will-change: transform;
  backdrop-filter: blur(5px);
  border: ${({ theme, isOpaque }) =>
    isOpaque ? `0px solid ${theme.borderLines}` : "none"};
  opacity: ${({ isDeleted }) => (isDeleted ? 0 : 1)};
  animation: 0.6s ${({ noAnimation }) => (noAnimation ? "none" : animation)};
  transition: box-shadow 0.08s ease-in-out, transform 0.08s ease-in-out,
    opacity 0.2s ease-in-out;
  background-color: ${({ theme, isOpaque }) =>
    isOpaque ? theme.shapes.base20 : theme.shapes.base};

  .card-darkener {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 176px;
    height: 88px;
    background-color: ${({ theme }) => theme.white};
    z-index: -10;
    border-radius: 44px;
    filter: blur(36px);
    opacity: 0;
  }

  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    width: 100%;
    height: 44px;
    padding: 0 1rem;
    color: ${({ theme, isOpaque }) =>
    isOpaque ? theme.search.text : theme.texts.button.base};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: scale(1.042);
    background-color: ${({ theme, isOpaque }) =>
      isOpaque ? theme.shapes.hover20 : theme.shapes.hover};

    .card-image {
      filter: ${({ theme }) => theme.imageEffects.cardImageDarkModeHover};
    }

    .card-icon {
      filter: ${({ theme }) => theme.imageEffects.cardImageDarkModeHover};
    }
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: scale(1);
    background-color: ${({ theme, isOpaque }) =>
      isOpaque ? theme.shapes.base20 : theme.shapes.base};
  }
`;

interface ICard {
  bookmark: IBookmark;
  className?: string;
  as?: "a" | "div";
}

export const Card: FC<ICard> = ({
  bookmark,
  className = "class-bookmark",
  as = "a",
}) => {
  const wallpapper = useAppSelector(
    (state) => state.settings.lookfeel.wallpaper
  );

  const [noAnimation, setNoAnimation] = useState(false);

  const fadeFix = {
    onMouseDown: () => setNoAnimation(true),
    onClick: () => setNoAnimation(true),
  };

  return (
    <CardStyled
      isDeleted={bookmark.deleted}
      isOpaque={!!wallpapper}
      noAnimation={noAnimation}
      href={`https://${bookmark.link}`}
      as={as}
      draggable={false}
      className={className}
      {...fadeFix}
    >
      {!!wallpapper && as !== "div" && <div className="card-darkener" />}

      <CardImage {...bookmark} />

      <Typography type="TextRegular12" className="card-title">
        {bookmark.name}
      </Typography>
    </CardStyled>
  );
};
