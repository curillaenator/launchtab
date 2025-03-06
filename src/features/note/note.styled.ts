import { CSSProperties } from 'react';
import styled from 'styled-components';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

const NoteContainer = styled.div<{ height: CSSProperties['height'] }>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  flex: 1 1 auto;
  height: ${({ height }) => `${height}px` || 'fit-content'};
  border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: var(--layout-pd);
`;

export { NoteContainer };
