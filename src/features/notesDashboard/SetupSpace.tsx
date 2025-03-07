import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { keys } from 'lodash';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Loader } from '@launch-ui/loader';
import { Corners } from '@launch-ui/shape';
import { Input, Titlewrap } from '@launch-ui/input';

import { type LaunchSpaceProps } from '@src/entities/space';

// import { UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';
import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import LabelIcon from '@src/assets/svg/lable.svg';
import SaveIcon from '@src/assets/svg/save.svg';
// import BinIcon from '@src/assets/svg/trash.svg';

const SetupSpaceStyled = styled.form`
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

interface SetupSpaceProps {
  closePopup: () => void;
  space: LaunchSpaceProps;
}

interface SetupSpaceFormFields {
  name: string;
}

const SetupSpace: FC<SetupSpaceProps> = (props) => {
  const { closePopup, space } = props;

  // const qc = useQueryClient();

  const [
    isRevalidating,
    // setIsRevalidating
  ] = useState<boolean>(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SetupSpaceFormFields>({ defaultValues: { name: space.name } });

  return (
    <SetupSpaceStyled
      onSubmit={handleSubmit((formData) => {
        console.log('formData', formData);
        // updateUnit(formData);
      })}
    >
      <Corners borderRadius={LAUNCH_PAPER_BDRS} />

      <Typography as='h2' type='RoundedHeavy36'>
        Space setup
      </Typography>

      <div className='form-fields'>
        <Titlewrap title='Space title'>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Set note name',
              minLength: { value: 3, message: 'Space name must be at least 3 characters' },
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

        {/* <Titlewrap title='Delete note'>
          <ButtonAction
            LeftIcon={() => <BinIcon />}
            appearance='danger'
            title='Delete note'
            type='button'
            onClick={(e) => {
              e.preventDefault();

              // if (confirm(`Are you sure to delete ${unit.name}?`)) deleteUnit();
            }}
          />
        </Titlewrap> */}
      </div>

      <div className='form-control'>
        <ButtonAction
          disabled={isRevalidating || !keys(dirtyFields).length || !!keys(errors).length}
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

        {isRevalidating && <Loader />}
      </div>
    </SetupSpaceStyled>
  );
};

export { SetupSpace };
