import React, { FC } from 'react';

import { useSignForm } from '../hooks/useSignForm';

import { ButtonAction, ButtonGhost } from '@launch-ui/button';
import { TextInput } from '../../inputs/TextInput';
import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

import { FormStyled } from './styles';

import AddIcon from '@src/assets/svg/add.svg';

export const SignUp: FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const [values, handlers, onSubmit] = useSignForm('signup');

  return (
    <FormStyled onSubmit={onSubmit}>
      <div className='form'>
        <Shape className='form-shape' borderRadius={24} />

        <div className='form-title'>
          <Typography type='RoundedHeavy56' className='form-title-main'>
            Sign Up
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Sign up is free! Signed users get fast loads and fully customizible look!
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Non signed appn has limited server connection speed and works slow as demo. App stores only your links &
            bookmarks when signed
          </Typography>
        </div>

        <div className='form-inputs'>
          <TextInput
            state={values.emailMes ? 'error' : 'normal'}
            type='email'
            iconName='email'
            name='email'
            placeholder='Email'
            value={values.email}
            onChange={handlers.handleEmail}
            description={values.emailMes ? values.emailMes : 'example@domain.name'}
          />

          <TextInput
            state={values.passwordMes ? 'error' : values.okPassword ? 'success' : 'normal'}
            type='password'
            iconName='password'
            name='password'
            placeholder='Password'
            value={values.password}
            onChange={handlers.handlePass}
            description={values.passwordMes ? values.passwordMes : 'minimum 8 chars, must contain at least 1 number'}
          />

          <TextInput
            state={values.confirmPasswordMes ? 'error' : values.okPassword ? 'success' : 'normal'}
            type='password'
            iconName='password'
            name='confirm_password'
            placeholder='Confirm password'
            value={values.confirmPassword}
            onChange={handlers.handleConfirmPass}
            description={values.confirmPasswordMes ? values.confirmPasswordMes : ''}
          />
        </div>

        <div className='form-buttons'>
          <ButtonGhost title='Close' onClick={closePopup} type='button' />
          <ButtonAction title='Create account' RightIcon={AddIcon} type='submit' />
        </div>
      </div>
    </FormStyled>
  );
};
