import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import { useQueryClient } from '@tanstack/react-query';
// import { useUnit as useEffectorUnit } from 'effector-react';

import { Corners } from '@launch-ui/shape';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
// import { Typography } from '@launch-ui/typography';

import { setHeaderMidComponent } from '@src/entities/header';
import type { LaunchNoteProps } from '@src/entities/note';

import { CreateNoteHeader } from './CreateNoteHeader';
import { CreateNoteForm } from './createNote.styled';

const CreateNote: FC = () => {
  const navigate = useNavigate();

  const {
    // control,
    register,
    // reset,
    // setValue,
    // watch,
    handleSubmit,
    // formState: { errors },
  } = useForm<LaunchNoteProps>({
    defaultValues: { name: '' },
  });

  useEffect(() => {
    setHeaderMidComponent(() => <CreateNoteHeader register={register} />);

    return () => {
      setHeaderMidComponent(null);
    };
  }, [register]);

  return (
    <CreateNoteForm
      data-create-note-form
      onSubmit={(e) => e.preventDefault()}
      // onSubmit={handleSubmit((spaceData: LaunchNoteProps) => {
      //   console.log('data-create-note-form', spaceData);
      // })}
    >
      <Corners borderRadius={24} />

      {/* <div className='create-note-form-title'>
        <Typography as='span' type='RoundedHeavy36'>
          {'Create Launch'}
        </Typography>
        <Typography as='span' type='RoundedHeavy36' className='text-highlighted'>
          Note
        </Typography>
      </div> */}

      <div className='create-note-form-field-controls'>
        <ButtonAction
          type='button'
          title='Create LaunchSpace'
          onClick={() =>
            handleSubmit((spaceData: LaunchNoteProps) => {
              console.log('data-create-note-form', spaceData);
            })()
          }
        />

        <ButtonGhost type='button' title='Cancel' onClick={() => navigate('/notes')} />
      </div>
    </CreateNoteForm>
  );
};

export { CreateNote };
