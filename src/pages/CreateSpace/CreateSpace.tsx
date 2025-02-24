import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUnit as useEffectorUnit } from 'effector-react';

import { Corners } from '@launch-ui/shape';
import { Button } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';

import { Input } from '@src/components/inputs';
import { $userStore } from '@src/entities/user';
import { useCreateSpace, LaunchSpaceProps } from '@src/entities/space';

import { CreateSpaceForm } from './createSpace.styled';

import { USER_SPACES_QUERY } from '@src/shared/queryKeys';

const CreateSpace: FC = () => {
  const navigate = useNavigate();
  const { uid } = useEffectorUnit($userStore);

  const qc = useQueryClient();

  const {
    control,
    // register,
    // reset,
    // setValue,
    // watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LaunchSpaceProps>({
    defaultValues: {
      name: '',
    },
  });

  const { mutate: createSpace } = useCreateSpace({
    uid,
    onSuccess: ({ createdSpaceCode }) => {
      console.log('updatedSpaces', createdSpaceCode);

      if (!!createdSpaceCode) {
        qc.invalidateQueries({ queryKey: [USER_SPACES_QUERY, uid] });
        navigate('/notes');
      }
    },
  });

  return (
    <CreateSpaceForm
      data-create-space-form
      onSubmit={handleSubmit((spaceData: LaunchSpaceProps) => {
        createSpace(spaceData);
      })}
    >
      <Corners borderRadius={24} />

      <div className='create-space-form-title'>
        <Typography as='span' type='RoundedHeavy36'>
          {'Create new '}
        </Typography>

        <Typography as='span' type='RoundedHeavy36' className='text-highlighted'>
          LaunchSpace
        </Typography>
      </div>

      <div className='create-space-form-field-list'>
        <div className='create-space-form-field'>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Set space name',
              minLength: { value: 8, message: 'Space name must be at least 8 characters' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                aria-required
                state={errors.name ? 'error' : 'normal'}
                description={errors.name ? errors.name.message : ''}
                type='text'
                placeholder='Space name'
                limitSymbols={48}
              />
            )}
          />
        </div>
      </div>

      <div className='create-space-form-field-controls'>
        <Button type='submit' active title='Create LaunchSpace' className='submit-button' />
      </div>
    </CreateSpaceForm>
  );
};

export { CreateSpace };
