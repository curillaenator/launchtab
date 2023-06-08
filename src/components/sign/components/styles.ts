import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 100%;
  background-color: transparent;
  border-radius: 24px;

  .form {
    position: relative;
    width: 100%;
    padding: 3rem;
    z-index: 20;

    &-shape {
      fill: ${({ theme }) => theme.backgrounds.base};
      filter: drop-shadow(${({ theme }) => theme.shadows.card});
    }

    &-title {
      margin-bottom: 56px;

      &-main {
        /* height: 60px; */
        color: ${({ theme }) => theme.primary[500]};
      }

      &-add,
      &-addsub {
        margin-top: 8px;
        margin-left: 2px;
        color: ${({ theme }) => theme.texts.sub};
      }
    }

    &-inputs {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      margin-bottom: 56px;
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }
  }

  @media (min-width: 768px) {
    width: 474px;
  }
`;
