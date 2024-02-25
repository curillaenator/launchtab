import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Modal } from '@launch-ui/modal';
import { Typography } from '@launch-ui/typography';
import { ButtonAction } from '@launch-ui/button';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

import StarIcon from '@src/assets/svg/star.svg';
import LoginIcon from '@src/assets/svg/login.svg';

const SignStyled = styled.div`
  position: fixed;
  top: calc(100vh - 72px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 72px;
  background-color: ${({ theme }) => theme.backgrounds.base};
  backdrop-filter: blur(16px);

  & .sign-text {
    color: ${({ theme }) => theme.texts.base};
  }
`;

export const Sign: FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <SignStyled>
      <Typography type='RoundedBold14' className='sign-text'>
        Get access to your bookmarks with
      </Typography>

      <ButtonAction title='Sign Up' RightIcon={StarIcon} onClick={() => setIsSignUpOpen(true)} />

      <Typography type='RoundedBold14' className='sign-text'>
        or
      </Typography>

      <ButtonAction title='Sign In' RightIcon={LoginIcon} onClick={() => setIsSignInOpen(true)} />

      <Modal open={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
        <SignIn closePopup={() => setIsSignInOpen(false)} />
      </Modal>

      <Modal open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp closePopup={() => setIsSignUpOpen(false)} />
      </Modal>
    </SignStyled>
  );
};
