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
  padding: 8px 0;

  .space-elements {
    display: flex;
    gap: 8px;
    width: 100%;
    margin-bottom: 16px;
  }

  .open-spaces-button {
    /* width: 100%; */
    justify-content: flex-start;
    max-width: calc(100% - 112px);
  }

  .unit-list {
    width: 100%;
    padding-left: 8px;
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
    height: 40px;
    border-radius: calc(12px * 1.25 + 3px);

    background-color: ${({ theme }) => theme.backgrounds.light};
  }

  .unit-loader-dummy {
    padding: 0 8px;
    margin-top: 8px;
    width: 100%;
  }
`;

export { AsideNotesElementStyled };
