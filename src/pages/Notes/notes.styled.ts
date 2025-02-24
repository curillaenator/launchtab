import { CSSProperties } from 'react';
import styled from 'styled-components';

const NotesContainer = styled.div<{ height: CSSProperties['height'] }>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: ${({ height }) => `${height}px` || 'fit-content'};
  border-radius: calc(24px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: 32px;
`;

const RichTextContainer = styled.div`
  width: 100%;
  flex: 1 1 auto;
`;

export { NotesContainer, RichTextContainer };
