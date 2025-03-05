import styled from 'styled-components';

const SettingsStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;

  .form {
    --shp-bgc: ${({ theme }) => theme.backgrounds.base};
    --shp-bdc: transparent;
    --form-bdrs: calc(24px * 1.25 + 3px);

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    width: 100%;
    height: 100%;
    padding: 28px 0;
    border-radius: var(--form-bdrs) 0 0 var(--form-bdrs);
    background-color: ${({ theme }) => theme.backgrounds.base};

    &-block {
      width: 100%;
      padding: 0 20px 0 28px;
    }

    &-topBlock {
      height: 100%;
    }

    &-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 40px;

      &-themed {
        color: ${({ theme }) => theme.primary[500]};
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export { SettingsStyled };
