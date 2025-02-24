import styled from 'styled-components';

interface HeaderStyledProps {
  isHeaderShadowed: boolean;
}

const HeaderStyled = styled.header<HeaderStyledProps>`
  z-index: 1000;
  display: flex;
  justify-content: space-between;

  position: sticky;
  top: 0;

  width: calc(100% - 144px);
  padding: 56px 0;
  margin: 0 72px;
  transition: filter 300ms ease;
  will-change: filter;
  filter: drop-shadow(
    ${({ theme, isHeaderShadowed }) => (isHeaderShadowed ? theme.shadows.header : '0 0 0 0 transparent')}
  );
`;

export { HeaderStyled };
