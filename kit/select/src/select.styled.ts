import styled from 'styled-components';

import type { SelectStyledProps } from './interfaces';

export const SelectStyled = styled.div<SelectStyledProps>`
  cursor: pointer;
  width: fit-content;
  position: relative;

  .dropdown-title {
    --shp-bdc: ${({ theme }) => theme.backgrounds.light};
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};

    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.backgrounds.light};
    border-radius: calc(20px * 1.25 + 3px);

    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 220px;
    height: 56px;
    padding: 0 24px;

    z-index: 10;

    &-text {
      color: ${({ theme }) => theme.texts.base};
      user-select: none;
      transition: 200ms linear;
    }

    &-shevron {
      transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0)')};
      transition: 200ms linear;
      fill: ${({ theme, open }) => (open ? theme.primary[700] : theme.texts.base)};
    }

    &:hover {
      .dropdown-title-text {
        color: ${({ theme }) => theme.primary[600]};
      }

      .dropdown-title-shevron {
        fill: ${({ theme, open }) => (open ? theme.primary[700] : theme.primary[600])};
      }
    }
  }

  .dropdown-body {
    --shp-bdc: ${({ theme }) => theme.backgrounds.light};
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};

    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.backgrounds.light};
    border-radius: calc(20px * 1.25 + 3px);

    position: absolute;
    top: 0;
    left: 0;
    width: 164px;
    height: ${({ open, bodyHeight }) => (open ? bodyHeight : 56)}px;
    transition: 200ms ease;
    background-color: ${({ theme }) => theme.backgrounds.base};
    opacity: ${({ open }) => (open ? 1 : 0)};
    filter: drop-shadow(${({ theme }) => theme.shadows.card});
    z-index: 9999;

    &-option {
      display: flex;
      align-items: center;
      width: 164px;
      height: 56px;
      padding-left: 0.5rem;
      background-color: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.backgrounds.light};

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
