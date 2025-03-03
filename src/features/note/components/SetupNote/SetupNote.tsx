import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { keys } from 'lodash';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Corners } from '@launch-ui/shape';
import { Input } from '@launch-ui/input';

import { useUnitUpdate, type LaunchUnitProps } from '@src/entities/note';

import { UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';

import { Loader } from '@src/features/loader';

import LabelIcon from '@src/assets/svg/lable.svg';
import SaveIcon from '@src/assets/svg/save.svg';

const SetupNoteStyled = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  width: 768px;

  border-radius: calc(24px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: 32px;

  .form-field {
    width: 100%;
    margin-top: 32px;
  }

  .form-control {
    margin-top: 32px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

interface SetupNoteProps {
  closePopup: () => void;
  unit: LaunchUnitProps;
}

interface SetupNoteFormFields {
  name: string;
}

const SetupNote: FC<SetupNoteProps> = (props) => {
  const { closePopup, unit } = props;

  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);

  const qc = useQueryClient();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SetupNoteFormFields>({ defaultValues: { name: unit.name } });

  const { mutate: updateUnit, isPending: isUnitUpdating } = useUnitUpdate({
    unitCode: unit.code,
    onSuccess: async () => {
      setIsRevalidating(true);
      await qc.invalidateQueries({ queryKey: [UNIT_NOTE_UNIT_QUERY, unit.code] });
      setIsRevalidating(false);

      reset();
      closePopup();
    },
  });

  return (
    <SetupNoteStyled
      onSubmit={handleSubmit((formData) => {
        console.log('formData', formData);
        updateUnit(formData);
      })}
    >
      <Corners borderRadius={24} />

      <Typography as='h2' type='RoundedHeavy36'>
        Setup
      </Typography>

      <div className='form-field'>
        <Controller
          name='name'
          control={control}
          rules={{
            required: 'Set note name',
            minLength: { value: 8, message: 'Space name must be at least 8 characters' },
            maxLength: { value: 64, message: 'Please do not go above 64 chars' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              icon={() => <LabelIcon />}
              aria-required
              state={errors.name ? 'error' : 'normal'}
              description={errors.name ? errors.name.message : ''}
              type='text'
              placeholder='Space name'
            />
          )}
        />
      </div>

      <div className='form-control'>
        <ButtonAction
          disabled={isUnitUpdating || isRevalidating || !keys(dirtyFields).length || !!keys(errors).length}
          type='submit'
          title='Save'
          LeftIcon={() => <SaveIcon />}
        />

        <ButtonGhost
          type='button'
          title='Cancel'
          onClick={() => {
            reset();
            closePopup();
          }}
        />

        {(isUnitUpdating || isRevalidating) && <Loader />}
      </div>
    </SetupNoteStyled>
  );
};

export { SetupNote };
