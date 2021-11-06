import React, { FC, useState } from "react";
import styled from "styled-components";

import { Modal } from "../modal/Modal";
import { Typography } from "../typography/Typography";
import { BtnCta, BtnGhost } from "../buttons";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Features } from "./components/Features";

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
  background-color: #F3F3F7B8;
  backdrop-filter: blur(12px);

  & .sign-text {
    color: ${({ theme }) => theme.texts.title.base};
  }
`;

export const Sign: FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
    <SignStyled>
      <Typography type="RoundedBold14" className="sign-text">
        Get access to your bookmarks from any device with
      </Typography>

      <BtnCta
        title="Pro account"
        leftIcon="star"
        handler={() => setIsSignUpOpen(true)}
      />

      <BtnGhost
        title="See all features"
        colorPreset="secondary-colors"
        handler={() => setIsFeaturesOpen(true)}
      />

      <BtnGhost
        title="Sign In"
        handler={() => setIsSignInOpen(true)}
      />

      <Modal open={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
        <SignIn close={() => setIsSignInOpen(false)} />
      </Modal>

      <Modal open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp close={() => setIsSignUpOpen(false)} />
      </Modal>

      <Modal open={isFeaturesOpen} onClose={() => setIsFeaturesOpen(false)}>
        <Features close={() => setIsFeaturesOpen(false)} />
      </Modal>
    </SignStyled>
  );
};
