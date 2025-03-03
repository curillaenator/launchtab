import styled from 'styled-components';

const NoteHeaderStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;

  width: 100%;
  height: 56px;
  border-radius: calc(20px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  margin: 0 32px;

  .note-header-title {
    font-family: inherit;
    height: 40px;
    font-size: 36px;
    line-height: 40px;
    font-weight: 600;
  }
`;

const NoteHeaderBlockStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
  width: fit-content;
`;

const SaveNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
  height: 100%;

  .save-notification-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
  }
`;

export { NoteHeaderStyled, NoteHeaderBlockStyled, SaveNotification };
