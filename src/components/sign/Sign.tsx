import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../modal/Modal';
import { Typography } from '@launch-ui/typography';
import { BtnCta } from '../buttons';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

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

      <BtnCta title='Sign Up' leftIcon='star' handler={() => setIsSignUpOpen(true)} />

      <Typography type='RoundedBold14' className='sign-text'>
        or
      </Typography>

      <BtnCta title='Sign In' handler={() => setIsSignInOpen(true)} />

      <Modal open={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
        <SignIn close={() => setIsSignInOpen(false)} />
      </Modal>

      <Modal open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp close={() => setIsSignUpOpen(false)} />
      </Modal>
    </SignStyled>
  );
};
