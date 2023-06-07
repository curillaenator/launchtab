import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 100%;
  background-color: transparent;
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.basic};

  .form {
    position: relative;
    width: 100%;
    padding: 4rem 3rem 2.5rem;
    z-index: 20;

    &-shape {
      fill: ${({ theme }) => theme.backgrounds.base};
    }

    &-title {
      margin-bottom: 68px;

      &-main {
        height: 60px;
        color: ${({ theme }) => theme.primary[500]};
      }

      &-add {
        margin-top: 7px;
        margin-left: 2px;
        color: ${({ theme }) => theme.texts.body.caption};
      }

      &-addsub {
        max-width: 244px;
        margin-top: 5px;
        margin-left: 3px;
        color: ${({ theme }) => theme.texts.body.caption};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      margin-bottom: 72px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      transform: translateX(16px);
    }
  }

  @media (min-width: 768px) {
    width: 474px;
  }
`;
