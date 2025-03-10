import styled from 'styled-components';
import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

const SetupNoteStyled = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  width: 768px;

  border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: var(--layout-pd);

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    margin-top: 24px;
  }

  .form-danger-zone {
    margin-top: 24px;
  }

  .form-control {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export { SetupNoteStyled };
