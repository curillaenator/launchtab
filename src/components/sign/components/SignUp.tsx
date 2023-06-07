import React, { FC } from 'react';

import { useSignForm } from '../hooks/useSignForm';

import { BtnCta, BtnGhost } from '../../buttons';
import { TextInput } from '../../inputs/TextInput';
import { Typography } from '../../typography';
import { Shape } from '../../shape/Shape';

import { FormStyled } from './styles';

interface ISignUp {
  close: () => void;
}

export const SignUp: FC<ISignUp> = ({ close }) => {
  const [values, handlers, onSubmit] = useSignForm('signup');

  return (
    <FormStyled onSubmit={onSubmit}>
      <div className='form'>
        <Shape className='form-shape' borderRadius={18} isAdaptive />

        <div className='form-title'>
          <Typography type='RoundedHeavy56' className='form-title-main'>
            Sign Up
          </Typography>

          <Typography type='TextRegular12' className='form-title-addsub'>
            Sign up is free, signed up users get fast loading and customizible app!
          </Typography>

          <Typography type='TextRegular12' className='form-title-addsub'>
            Non signed up application has limited server connection speed and works slow as demo.
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
          <BtnGhost type='button' title='Close' handler={close} />

          <BtnCta title='I want my workspace' rightIcon='signUp' type='submit' />
        </div>
      </div>
    </FormStyled>
  );
};
