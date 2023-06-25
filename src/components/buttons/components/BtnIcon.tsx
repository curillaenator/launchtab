import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { Shape } from '@src/components/shape/Shape';

import { icons } from '../assets/icons';
import type { IBtnIcon } from './interfaces';

interface IBtnStyled {
  active: boolean;
  isLoading: boolean;
  hasImage: boolean;
}

const iconsCss = {
  settings: css<IBtnStyled>`
    .settings-icon {
      opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
      transition: 0.12s linear;

      &-light {
        fill: ${({ theme }) => theme.white};
      }

      &-dark {
        fill: ${({ theme }) => theme.icons.dark};
      }
    }

    &:hover {
      .settings-icon {
        &-light {
          fill: ${({ theme }) => theme.primary[500]};
        }

        &-dark {
          fill: ${({ theme }) => theme.white};
        }
      }
    }
  `,

  addIcon: css<IBtnStyled>`
    .addIcon {
      &-light {
        fill: ${({ active, theme }) => (active ? theme.primary[500] : theme.white)};
      }
    }

    &:hover {
      .addIcon {
        &-light {
          fill: ${({ active, theme }) => (active ? theme.primary[500] : theme.primary[500])};
        }
      }
    }
  `,
};

const BtnStyled = styled.button<IBtnStyled>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ hasImage }) => (hasImage ? 'fit-content' : '56px')};
  height: ${({ hasImage }) => (hasImage ? 'fit-content' : '56px')};

  ${iconsCss.settings}
  ${iconsCss.addIcon}

  .defaultIcon {
    &-light {
      transition: 0.08s linear;
    }

    &-dark {
      transition: 0.08s linear;
    }
  }

  .button-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    overflow: hidden;
  }

  .rounded-shape {
    fill: ${({ active, theme }) => (active ? theme.white : theme.backgrounds.base40)};
    backdrop-filter: blur(8px);
  }

  &:hover {
    .button-image {
      background-color: ${({ theme }) => theme.texts.inversedBase};
    }
  }
`;

export const BtnIcon = forwardRef<HTMLButtonElement, IBtnIcon>((props, ref) => {
  const {
    iconName,
    imageURL,
    active = false,
    isLoading = false,
    disabled = false,
    handler,
    imageHandler,
    ...rest
  } = props;

  return (
    <BtnStyled
      {...rest}
      ref={ref}
      active={active}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      hasImage={!!imageURL}
      onClick={imageHandler ? () => imageHandler(imageURL as string) : handler}
    >
      {!isLoading && !imageURL && <Shape borderRadius={18} />}

      {iconName && icons[iconName]}

      {imageURL && <img key={imageURL} className='button-image' src={imageURL} alt={imageURL} />}
    </BtnStyled>
  );
});

BtnIcon.displayName = 'BtnIcon';
