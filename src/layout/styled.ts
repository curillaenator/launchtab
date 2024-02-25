import styled from 'styled-components';

const LayoutStyled = styled.div<{ isAsideOpen: boolean }>`
  position: relative;

  display: flex;
  width: 100%;
  min-width: 1280px;
  color: ${({ theme }) => theme.texts.base};

  .aside {
    position: sticky;
    top: 0;
    width: ${({ isAsideOpen }) => (isAsideOpen ? '384px' : '0')};
    min-height: 100vh;
    max-height: 100vh;
    flex-shrink: 0;
    transition: width 200ms ease;
    overflow: hidden;
  }

  .viewport {
    width: 100%;
  }
`;

export default LayoutStyled;
