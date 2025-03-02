import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const AsideStyled = styled.div<{ isAsideOpen: boolean }>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  --form-bdrs: calc(24px * 1.25 + 3px);
  /* --form-bdrs: 24px; */

  position: relative;

  display: flex;
  flex-direction: column;

  width: 384px;
  height: 100%;
  border-radius: 0 var(--form-bdrs) var(--form-bdrs) 0;
  background-color: ${({ theme }) => theme.backgrounds.base};

  will-change: transform;
  transform: translateX(${({ isAsideOpen }) => (isAsideOpen ? '0px' : '-384px')});
  transition: transform 200ms ease;
`;

const AsideHeader = styled.div`
  width: 100%;
  padding: 32px;
  color: ${({ theme }) => theme.texts.base};
  flex: 0 0 auto;

  .highlighted {
    color: ${({ theme }) => theme.primary[500]};
  }
`;

const AsideRoutesList = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;
  flex: 1 1 auto;

  .active {
    color: ${({ theme }) => theme.primary[500]};
  }
`;

const RouteLinkStyled = styled(NavLink)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 40px;

  padding: 8px 12px;

  text-decoration: none;
  color: ${({ theme }) => theme.texts.base};

  &:hover {
    color: ${({ theme }) => theme.primary[300]};
  }

  &:active {
    color: ${({ theme }) => theme.primary[800]};
  }
`;

const RouteDivider = styled.div`
  flex: 0 0 auto;
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.borders.base};
`;

export { AsideStyled, AsideHeader, AsideRoutesList, RouteLinkStyled, RouteDivider };
