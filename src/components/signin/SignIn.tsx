import React, { FC } from 'react';

import { Button, ButtonAction, ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';
import { Shape } from '@launch-ui/shape';

import { login } from '@src/entities/user';

import { FormStyled } from './styles';

import LoginIcon from '@src/assets/svg/login.svg';
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
            Why sign in? Just to save your bookmarks so you can use it from any device under your account.
          </Typography>
        </div>

        <div className='form-inputs'>
          <Button
            type='button'
            title='To my account'
            IconLeft={GoogleIcon}
            onClick={() => {
              closePopup();
              login();
            }}
          />
        </div>

        {/* <div className='form-buttons'>
          <ButtonGhost title='Cancel' onClick={closePopup} type='button' />
          <ButtonAction title='To my account' RightIcon={LoginIcon} type='submit' />
        </div> */}
      </div>
    </FormStyled>
  );
};
