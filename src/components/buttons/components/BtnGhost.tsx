import React, { forwardRef } from "react";
import styled from "styled-components";

import { Typography } from "../../typography/Typography";

import { icons } from "../assets/icons";
import type { IBtnGhost } from "./interfaces";

interface IButtonStyled {
  active: boolean;
  danger: boolean;
}

const ButtonStyled = styled.button<IButtonStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  background: transparent;
  z-index: 20;

  .svg_icon {
    width: 1rem;
    width: 1rem;
    margin-right: 0.75rem;
  }

  .common-title {
    transition: 0.08s ease-in-out;
    user-select: none;
    white-space: nowrap;
  }

  .primary-colors {
    color: ${({ active, theme, disabled, danger }) => {
      switch (true) {
        case disabled:
          return theme.shapes.base;
        case danger:
          return theme.texts.button.danger;
        case active:
          return theme.primary[500];
        default:
          return theme.texts.body.paragraph;
      }
    }};
  }

  .secondary-colors {
    color: ${({ active, theme, disabled, danger }) => {
      switch (true) {
        case disabled:
          return theme.shapes.base;
        case danger:
          return theme.texts.button.danger;
        case active:
          return theme.primary[500];
        default:
          return theme.secondary[500];
      }
    }};
  }

  &:hover {
    .primary-colors {
      color: ${({ theme, active, disabled, danger }) => {
        switch (true) {
          case disabled:
            return theme.shapes.base;
          case danger:
            return theme.texts.button.dangerHover;
          case active:
            return theme.primary[500];
          default:
            return theme.texts.button.hover;
        }
      }};
    }

    .secondary-colors {
      color: ${({ active, theme, disabled, danger }) => {
        switch (true) {
          case disabled:
            return theme.shapes.base;
          case danger:
            return theme.texts.button.danger;
          case active:
            return theme.secondary[500];
          default:
            return theme.texts.button.hover;
        }
      }};
    }
  }
`;

export const BtnGhost = forwardRef<HTMLButtonElement, IBtnGhost>(
  (props, ref) => {
    const {
      title,
      leftIcon,
      active = false,
      danger = false,
      disabled = false,
      type = "button",
      colorPreset = "primary-colors",
      className = "ghost-button",
      handler,
    } = props;

    return (
      <ButtonStyled
        ref={ref}
        className={className}
        active={active}
        disabled={disabled}
        danger={danger}
        type={type}
        onClick={handler}
      >
        {!!leftIcon && icons[leftIcon]}

        {title && (
          <Typography
            type="RoundedBold14"
            className={`${colorPreset} common-title`}
          >
            {title}
          </Typography>
        )}
      </ButtonStyled>
    );
  }
);
