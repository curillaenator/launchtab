import React, { FC } from 'react';

import { useSignForm } from '../hooks/useSignForm';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { TextInput } from '../../inputs/TextInput';
import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

import { FormStyled } from './styles';

import LoginIcon from '@src/assets/svg/login.svg';

export const SignIn: FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const [values, handlers, onSubmit] = useSignForm('signin');

  return (
    <FormStyled onSubmit={onSubmit}>
      <div className='form'>
        <Shape className='form-shape' borderRadius={24} />

        <div className='form-title'>
          <Typography type='RoundedHeavy56' className='form-title-main'>
            Sign In
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Manage your frequently used links & bookmarks
          </Typography>
        </div>

        <div className='form-inputs'>
          <TextInput
            state={values.emailMes ? 'error' : 'normal'}
            type='email'
            iconName='email'
            name='email'
            placeholder='Email'
            description={values.emailMes}
            value={values.email}
            onChange={handlers.handleEmail}
          />

          <TextInput
            state={values.passwordMes ? 'error' : 'normal'}
            type='password'
            iconName='password'
            name='password'
            placeholder='Password'
            description={values.passwordMes}
            value={values.password}
            onChange={handlers.handlePass}
          />
        </div>

        <div className='form-buttons'>
          <ButtonGhost title='Cancel' onClick={closePopup} type='button' />
          <ButtonAction title='To my account' RightIcon={LoginIcon} type='submit' />
        </div>
      </div>
    </FormStyled>
  );
};
