import React, { FC } from 'react';

import { Button } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

import { login } from '@src/entities/user';

import { FormStyled } from './styles';

import GoogleIcon from '@src/assets/svg/google.svg';

export const SignIn: FC<{ closePopup: () => void }> = ({ closePopup }) => {
  return (
    <FormStyled onSubmit={() => login()}>
      <div className='form'>
        <Shape className='form-shape' borderRadius={24} />

        <div className='form-title'>
          <Typography type='RoundedHeavy56' className='form-title-main'>
            Sign In
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Why? App won't save your changes unless you signed in
          </Typography>

          <Typography as='p' type='TextRegular14' className='form-title-add'>
            Enter via your Google account so it'll be easy to use your saved links/tabs and customized view on any
            device under your account
          </Typography>
        </div>

        <div className='form-buttons'>
          <Button
            type='button'
            title='Close'
            onClick={() => {
              closePopup();
            }}
          />

          <Button
            type='button'
            title='Sign in with Google'
            IconLeft={() => <GoogleIcon />}
            onClick={() => {
              closePopup();
              login();
            }}
          />
        </div>
      </div>
    </FormStyled>
  );
};
