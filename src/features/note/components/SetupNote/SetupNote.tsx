import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { keys } from 'lodash';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Loader } from '@launch-ui/loader';
import { Corners } from '@launch-ui/shape';
import { Input, Titlewrap, Switch } from '@launch-ui/input';

import { useUnitUpdate, useUnitDelete, type LaunchUnitProps } from '@src/entities/note';

import { UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';
import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import LabelIcon from '@src/assets/svg/lable.svg';
import SaveIcon from '@src/assets/svg/save.svg';
import BinIcon from '@src/assets/svg/trash.svg';

const SetupNoteStyled = styled.form`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;

  // for corners
  position: relative;

  width: 768px;

  border-radius: calc(${LAUNCH_PAPER_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: var(--layout-pd);

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    margin-top: 24px;
  }

  .form-danger-zone {
    margin-top: 24px;
  }

  .form-control {
    margin-top: 24px;
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
  locked: boolean;
}

const SetupNote: FC<SetupNoteProps> = (props) => {
  const { closePopup, unit } = props;

  const qc = useQueryClient();

  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SetupNoteFormFields>({ defaultValues: { name: unit.name, locked: !!unit.locked } });

  const { mutate: deleteUnit, isPending: isUnitDeleting } = useUnitDelete(unit.code);

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
        // console.log('formData', formData);
        updateUnit(formData);
      })}
    >
      <Corners borderRadius={LAUNCH_PAPER_BDRS} />

      <Typography as='h2' type='RoundedHeavy36'>
        Note attributes
      </Typography>

      <div className='form-fields'>
        <Titlewrap title='Note title'>
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
        </Titlewrap>

        <Titlewrap title='Note lock'>
          <Controller
            name='locked'
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={(checked) => field.onChange({ target: { value: checked } })} />
            )}
          />
        </Titlewrap>

        <Titlewrap title='Delete note'>
          <ButtonAction
            LeftIcon={() => <BinIcon />}
            appearance='danger'
            title='Delete note'
            type='button'
            onClick={(e) => {
              e.preventDefault();

              if (confirm(`Are you sure to delete ${unit.name}?`)) deleteUnit();
            }}
          />
        </Titlewrap>
      </div>

      <div className='form-control'>
        <ButtonAction
          disabled={
            isUnitDeleting || isUnitUpdating || isRevalidating || !keys(dirtyFields).length || !!keys(errors).length
          }
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

        {(isUnitDeleting || isUnitUpdating || isRevalidating) && <Loader />}
      </div>
    </SetupNoteStyled>
  );
};

export { SetupNote };
