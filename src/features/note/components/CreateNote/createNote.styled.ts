import styled from 'styled-components';

const CreateNoteForm = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  width: 100%;

  border-radius: calc(24px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: 32px;

  .create-note-form-field-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    width: 100%;
    padding: 32px 0;
  }

  .create-note-form-field-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .text-highlighted {
    color: ${({ theme }) => theme.primary[500]};
  }
`;

export { CreateNoteForm };
