import React, { FC } from 'react';

import { useSignForm } from '../hooks/useSignForm';

import { BtnCta, BtnGhost } from '../../buttons';
import { TextInput } from '../../inputs/TextInput';
import { Typography } from '../../typography';
import { Shape } from '../../shape/Shape';

import { FormStyled } from './styles';

interface ISignIn {
  close: () => void;
}

export const SignIn: FC<ISignIn> = ({ close }) => {
  const [values, handlers, onSubmit] = useSignForm('signin');

  return (
    <FormStyled onSubmit={onSubmit}>
      <div className='form'>
        <Shape className='form-shape' borderRadius={18} isAdaptive />

        <div className='form-title'>
          <Typography type='RoundedHeavy56' className='form-title-main'>
            Sign In
          </Typography>

          <Typography type='RoundedBold20' className='form-title-add'>
            to your custom workspace!
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
            // withButton
            // buttonTitle='remind'
            value={values.password}
            onChange={handlers.handlePass}
          />
        </div>

        <div className='form-buttons'>
          <BtnGhost type='button' title='Cancel' handler={close} />

          <BtnCta title='I want my bookmarks!' rightIcon='login' type='submit' />
        </div>
      </div>
    </FormStyled>
  );
};
