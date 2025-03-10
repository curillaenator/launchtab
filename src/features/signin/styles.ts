import styled from 'styled-components';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

export const FormStyled = styled.form`
  width: 100%;
  background-color: transparent;
  width: 474px;

  .form {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: transparent;

    position: relative;

    width: 100%;
    padding: var(--layout-pd);
    z-index: 20;

    border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
    background-color: ${({ theme }) => theme.backgrounds.base};
    filter: drop-shadow(${({ theme }) => theme.shadows.drawer});

    &-title {
      margin-bottom: 24px;

      &-main {
        color: ${({ theme }) => theme.primary[500]};
        margin-bottom: 24px;
      }

      &-add {
        margin-top: 8px;
        color: ${({ theme }) => theme.texts.base};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-bottom: 24px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }
  }
`;
