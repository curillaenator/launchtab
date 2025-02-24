import styled from 'styled-components';

const NotesSelectorStyled = styled.div`
  --dd-pd: 8px 8px;
  --dd-bdw: 1px;
  --dd-scrl-pd: 0;
  --dd-bdrs: 18px;

  --dd-bgc: var(--theme-backgrounds-lightest);
  --dd-bdc: var(--theme-backgrounds-dark);
  --dd-drop-sh: 0 0 0 0 transparent;

  width: 100%;
  min-height: 40px;
  padding: 32px 0;

  .space-elements {
    display: flex;
    gap: 8px;
    width: 100%;
  }

  .open-spaces-button {
    width: calc(100% - 64px);
    justify-content: flex-start;

    &_inactive {
      --shp-bgc: var(--theme-backgrounds-lightest);
    }
  }

  .create-space-button {
    width: 100%;

    &_inactive {
      --shp-bgc: var(--theme-backgrounds-lightest);
    }
  }

  .unit-list {
    margin-top: 32px;
    width: 100%;
    padding-left: 24px;
  }

  .selector-loader-dummy {
    --shp-bgc: ${({ theme }) => theme.backgrounds.lightest};
    --shp-bdc: transparent;

    // for corners
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 56px;
    border-radius: calc(24px * 1.25 + 3px);

    background-color: ${({ theme }) => theme.backgrounds.lightest};
  }

  .unit-loader-dummy {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 32px;
    width: 100%;
    height: 40px;
  }
`;

export { NotesSelectorStyled };
