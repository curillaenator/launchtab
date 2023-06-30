import styled from 'styled-components';

interface CreateContainerStyledProps {
  isCreateBookmark: boolean;
  active: boolean;
}

export const CreateContainerStyled = styled.div<CreateContainerStyledProps>`
  --shp-bgc: ${({ theme, isCreateBookmark }) => (isCreateBookmark ? 'transparent' : theme.backgrounds.base)};
  --shp-bdc: ${({ theme }) => theme.backgrounds.base};
  --icon-light: ${({ theme, isCreateBookmark }) => (isCreateBookmark ? theme.backgrounds.base : theme.texts.base)};

  border-radius: calc(20px * 1.25 + 3px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  min-width: 56px;
  width: ${({ isCreateBookmark }) => (isCreateBookmark ? '100%' : 'fit-content')};
  height: ${({ isCreateBookmark }) => (isCreateBookmark ? '100%' : 'fit-content')};
  background-color: var(--shp-bgc);
  min-height: ${({ isCreateBookmark }) => (isCreateBookmark ? '186px' : undefined)};
  cursor: pointer;
  /* pointer-events: none; */

  &:hover {
    /* --shp-bdc: ${({ theme }) => theme.primary[500]}; */
    --icon-light: ${({ theme }) => theme.primary[500]};
  }

  button {
    width: 100%;
    height: 100%;
    outline: none;
  }

  .create-shape {
    fill: transparent;
    stroke: ${({ theme, isCreateBookmark }) => (isCreateBookmark ? theme.backgrounds.lightest : 'transparent')};
    stroke-width: 1px;
  }
`;
