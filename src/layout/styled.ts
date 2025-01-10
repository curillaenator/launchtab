import styled from 'styled-components';

const ASIDE_WIDTH = '384px';

const LayoutStyled = styled.div<{ $isAsideOpen: boolean }>`
  position: relative;

  display: flex;
  width: 100%;
  min-width: 1280px;
  color: ${({ theme }) => theme.texts.base};

  .aside {
    position: sticky;
    top: 0;
    flex: 0 0 auto;
    width: ${({ $isAsideOpen }) => ($isAsideOpen ? ASIDE_WIDTH : '0px')};
    min-height: 100vh;
    max-height: 100vh;

    will-change: width;
    transition: width 160ms ease;
  }

  .viewport {
    width: 100%;
    flex: 1 1 auto;

    min-height: 100vh;
    max-height: 100vh;

    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      margin-left: 0.25rem;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.backgrounds.base};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.primary[500]};
      border-radius: 4px;
    }
  }
`;

export default LayoutStyled;
