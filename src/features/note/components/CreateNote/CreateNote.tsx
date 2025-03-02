import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { useQueryClient } from '@tanstack/react-query';
// import { useUnit as useEffectorUnit } from 'effector-react';

import { Corners } from '@launch-ui/shape';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Input } from '@launch-ui/input';
import { Typography } from '@launch-ui/typography';

// import { $userStore } from '@src/entities/user';
import type { LaunchNoteProps } from '@src/entities/note';

import { CreateNoteForm } from './createNote.styled';

// import { USER_QUERY } from '@src/shared/queryKeys';

import LabelIcon from '@src/assets/svg/lable.svg';

const CreateNote: FC = () => {
  const navigate = useNavigate();

  const {
    control,
    // register,
    // reset,
    // setValue,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LaunchNoteProps>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <CreateNoteForm
      data-create-note-form
      onSubmit={handleSubmit((spaceData: LaunchNoteProps) => {
        console.log('data-create-note-form', spaceData);
      })}
    >
      <Corners borderRadius={24} />

      <div className='create-note-form-title'>
        <Typography as='span' type='RoundedHeavy36'>
          {'Create Launch'}
        </Typography>
        <Typography as='span' type='RoundedHeavy36' className='text-highlighted'>
          Note
        </Typography>
      </div>

      <div className='create-note-form-field-list'>
        <div className='create-note-form-field'>
          <Controller
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
                placeholder='Note name'
                limitSymbols={64}
              />
            )}
          />
        </div>
      </div>

      <div className='create-note-form-field-controls'>
        <ButtonAction type='submit' title='Create LaunchSpace' />
        <ButtonGhost type='button' title='Cancel' onClick={() => navigate('/notes')} />
      </div>
    </CreateNoteForm>
  );
};

export { CreateNote };
