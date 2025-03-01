import styled from 'styled-components';

const AsideNotesElementStyled = styled.div`
  --dd-pd: 8px 8px;
  --dd-bdw: 1px;
  --dd-scrl-pd: 0;
  --dd-bdrs: 18px;

  --dd-bgc: var(--theme-backgrounds-light);
  --dd-bdc: var(--theme-borders-base);
  --dd-drop-sh: 0 0 0 0 transparent;

  width: 100%;
  min-height: 40px;
  padding: 32px 0;

  .space-elements {
    display: flex;
    gap: 16px;
    width: 100%;
  }

  .open-spaces-button {
    --shp-bgc: var(--theme-backgrounds-light);

    width: 100%;
    justify-content: flex-start;

    &_active {
      --shp-bgc: var(--theme-primary-700);
    }
  }

  .create-space-button {
    --shp-bgc: var(--theme-backgrounds-light);

    width: 100%;
    flex: 0 0 auto;

    &_active {
      --shp-bgc: var(--theme-primary-700);
    }
  }

  .hierarchy-create-space-button {
    --shp-bgc: var(--theme-backgrounds-light);

    &_active {
      --shp-bgc: var(--theme-primary-700);
    }
  }

  .hierarchy-create-note {
    margin-top: 32px;
    width: 100%;

    &-button {
      --shp-bgc: var(--theme-backgrounds-light);

      width: 100%;

      &_active {
        --shp-bgc: var(--theme-primary-700);
      }
    }
  }

  .unit-list {
    margin-top: 32px;
    width: 100%;
    padding-left: 12px;
  }

  .selector-loader-dummy {
    --shp-bgc: ${({ theme }) => theme.backgrounds.light};
    --shp-bdc: transparent;

    // for corners
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 56px;
    border-radius: calc(24px * 1.25 + 3px);

    background-color: ${({ theme }) => theme.backgrounds.light};
  }

  .unit-loader-dummy {
    margin-top: 16px;
    width: 100%;
  }
`;

export { AsideNotesElementStyled };
