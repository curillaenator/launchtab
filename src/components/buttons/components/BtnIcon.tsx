import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { icons } from '../assets/icons';
import type { IBtnIcon } from './interfaces';

interface IBtnStyled {
  active: boolean;
  isLoading: boolean;
}

const iconsCss = {
  settings: css<IBtnStyled>`
    .settings-icon {
      opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
      transition: 0.12s linear;

      &-light {
        fill: ${({ theme }) => theme.icons.light};
      }

      &-dark {
        fill: ${({ theme }) => theme.icons.dark};
      }

      &-bg {
        fill: ${({ theme }) => theme.shapes.base};
      }
    }

    &:hover {
      .settings-icon {
        &-light {
          fill: ${({ theme }) => theme.icons.lightHover};
        }

        &-dark {
          fill: ${({ theme }) => theme.icons.darkHover};
        }
      }
    }
  `,

  addIcon: css<IBtnStyled>`
    .addIcon {
      &-light {
        fill: ${({ active, theme }) => (active ? theme.primary[500] : theme.texts.button.base)};
      }
    }

    &:hover {
      .addIcon {
        &-light {
          fill: ${({ active, theme }) => (active ? theme.primary[500] : theme.texts.button.hover)};
        }
      }
    }
  `,
};

const BtnStyled = styled.button<IBtnStyled>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;

  ${iconsCss.settings}
  ${iconsCss.addIcon}

  .defaultIcon {
    &-light {
      transition: 0.08s linear;
    }

    &-dark {
      transition: 0.08s linear;
    }

    &-bg {
      fill: ${({ theme }) => theme.shapes.base};
    }
  }

  .button-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    overflow: hidden;
  }

  &:hover {
    .button-image {
      background-color: ${({ theme }) => theme.shapes.hover};
    }
  }
`;

export const BtnIcon = forwardRef<HTMLButtonElement, IBtnIcon>((props, ref) => {
  const { iconName, imageURL, active = false, isLoading = false, disabled = false, handler, imageHandler } = props;

  return (
    <BtnStyled
      ref={ref}
      active={active}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      onClick={imageHandler ? () => imageHandler(imageURL as string) : handler}
    >
      {iconName && icons[iconName]}

      {imageURL && <img key={imageURL} className='button-image' src={imageURL} alt={imageURL} />}
    </BtnStyled>
  );
});

BtnIcon.displayName = 'BtnIcon';
