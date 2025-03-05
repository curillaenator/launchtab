import { CSSProperties } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div<{ height: CSSProperties['height'] }>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100%;
  flex: 1 1 auto;
  border-radius: calc(24px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: 28px;
`;

export { DashboardContainer as NoteContainer };
