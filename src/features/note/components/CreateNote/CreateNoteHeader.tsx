import React, { FC } from 'react';
import { UseFormRegister as HookFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';
import type { RichTextJsonContent } from '@launch-ui/richtext';

import type { LaunchNoteProps } from '@src/entities/note';
import { Loader } from '@src/features/loader';

import NoteTitleIcon from '@src/assets/svg/bookmark.svg';

const NoteHeaderStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  display: flex;
  align-items: center;

  gap: 16px;
  padding: 8px 16px;

  width: 100%;
  height: 56px;
  border-radius: calc(20px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  margin: 0 32px;

  & > svg {
    flex: 0 0 auto;
  }

  .create-note-title-input {
    outline: none;
    border: none;
    background-color: transparent;

    flex: 1 1 auto;
    width: 100%;
    height: 40px;

    color: ${({ theme }) => theme.texts.base};
    font-family: inherit;
    font-size: 36px;
    line-height: 40px;
    font-weight: 600;

    &::placeholder {
      color: ${({ theme }) => theme.texts.placeholder};
      font-family: inherit;
      font-size: 36px;
      line-height: 40px;
      font-weight: 600;
    }
  }
`;

const NoteHeaderChildren = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 8px;
  width: fit-content;
  min-height: 40px;
  max-height: 40px;
`;

interface CreateNoteHeaderProps {
  register: HookFormRegister<LaunchNoteProps & { noteBody: RichTextJsonContent | string }>;
  isSubmitting: boolean;
}

const CreateNoteHeader: FC<CreateNoteHeaderProps> = (props) => {
  const { register, isSubmitting } = props;

  return (
    <NoteHeaderStyled data-create-note-header>
      <Corners borderRadius={20} />

      <NoteTitleIcon />

      <input
        autoComplete='off'
        type='text'
        placeholder='Note title...'
        className='create-note-title-input'
        {...register('name', {
          required: 'Set note title',
          minLength: { value: 8, message: 'Please use at least 8 chars' },
          maxLength: { value: 64, message: 'Please do not go above 64 chars' },
        })}
      />

      <NoteHeaderChildren>
        {isSubmitting && (
          <>
            <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
              Saving
            </Typography>
            <Loader />
          </>
        )}
      </NoteHeaderChildren>
    </NoteHeaderStyled>
  );
};

export { CreateNoteHeader };
