import React, { FC } from 'react';
import styled from 'styled-components';
import { UseFormRegister as HookFormRegister } from 'react-hook-form';
import { Corners } from '@launch-ui/shape';

import type { LaunchNoteProps } from '@src/entities/note';

// import { Loader } from '@src/features/loader';

import LabelIcon from '@src/assets/svg/lable.svg';

const NoteHeaderStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  display: flex;
  align-items: center;
  /* justify-content: space-between; */

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

  .create-note-title {
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
    font-weight: 800;

    &::placeholder {
      color: ${({ theme }) => theme.texts.placeholder};
      font-family: inherit;
      font-size: 36px;
      font-weight: 800;
    }
  }
`;

// const NoteHeaderBlockStyled = styled.div`
//   display: flex;
//   gap: 8px;
//   flex: 0 0 auto;
//   width: fit-content;
// `;

interface CreateNoteHeaderProps {
  register: HookFormRegister<LaunchNoteProps>;
  // errors: HookFormFieldErrors<LaunchNoteProps>;
}

const CreateNoteHeader: FC<CreateNoteHeaderProps> = ({ register }) => {
  return (
    <NoteHeaderStyled data-note-header>
      <Corners borderRadius={20} />

      <LabelIcon />

      {/* <NoteHeaderBlockStyled> */}
      <input
        autoComplete='off'
        type='text'
        placeholder='Type your note name'
        className='create-note-title'
        {...register('name', {
          required: 'Set note name',
          minLength: { value: 8, message: 'Please use at least 8 characters' },
          maxLength: { value: 64, message: 'Please dont exceed 64 characters' },
        })}
      />

      {/* <HookFormController
          name='name'
          control={control}
          rules={{
            required: 'Set note name',
            minLength: { value: 8, message: 'Space name must be at least 8 characters' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              icon={() => <LabelIcon />}
              aria-required
              state={errors.name ? 'error' : 'normal'}
              description={errors.name ? errors.name.message : ''}
              type='text'
              placeholder='Type your note name'
              limitSymbols={64}
            />
          )}
        /> */}

      {/* </NoteHeaderBlockStyled> */}

      {/* <NoteHeaderBlockStyled></NoteHeaderBlockStyled> */}
    </NoteHeaderStyled>
  );
};

export { CreateNoteHeader };
