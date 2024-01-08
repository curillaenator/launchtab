import styled from 'styled-components';

import type { BaseButtonProps } from './interfaces';

export const ButtonStyled = styled.button<BaseButtonProps>`
  --shp-bgc: ${({ theme, active }) => (active ? theme.primary[500] : theme.backgrounds.base)};
  --shp-bdc: transparent;

  will-change: filter;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  padding: 0 32px;
  background-color: var(--shp-bgc);
  border-radius: calc(18px * 1.25 + 3px);

  filter: ${({ active }) => (active ? 'contrast(1.3)' : 'contrast(1)')}
    drop-shadow(
      ${({ active, theme }) => {
        switch (true) {
          case active:
            return theme.shadows.primary;
          default:
            return 'none';
        }
      }}
    );

  .svg_icon {
    width: 1rem;
    width: 1rem;
    margin-right: 0.75rem;
  }

  .title {
    color: ${({ active, theme }) => (active ? theme.white : theme.texts.base)};
    user-select: none;
    white-space: nowrap;
  }

  &:hover {
    .title {
      color: ${({ theme, active }) => (active ? theme.white : theme.primary[500])};
    }
  }
`;
