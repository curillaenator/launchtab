import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 100%;
  background-color: transparent;
  border-radius: 24px;

  .form {
    position: relative;
    width: 100%;
    padding: 32px;
    z-index: 20;

    &-shape {
      fill: ${({ theme }) => theme.backgrounds.base};
      filter: drop-shadow(${({ theme }) => theme.shadows.card});
    }

    &-title {
      margin-bottom: 32px;

      &-main {
        color: ${({ theme }) => theme.primary[500]};
        margin-bottom: 32px;
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
      margin-bottom: 32px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }
  }

  @media (min-width: 768px) {
    width: 474px;
  }
`;
