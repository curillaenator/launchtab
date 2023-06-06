import { FormEvent, useEffect, useReducer } from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import * as r from '../reducer/reducer';

import { proSignUp, signIn } from '../../../redux/reducers/auth';
import { IFormState } from '../reducer/reducer';

import { signInErrorsMessages, signUpErrorsMesages } from './errors';

interface StateHandlers {
  handleEmail: (email: string) => void;
  handlePass: (password: string) => void;
  handleConfirmPass: (confirmPassword: string) => void;
}

export const useSignForm = (type: 'signin' | 'signup'): [IFormState, StateHandlers, (e: FormEvent) => void] => {
  const appDispatch = useAppDispatch();

  const [formStates, formDispatch] = useReducer(r.reducer, r.initialState);

  const {
    email,
    emailMes,

    password,
    passwordMes,

    confirmPassword,
    confirmPasswordMes,

    okPassword,
  } = formStates;

  const onSubmit = (e: FormEvent) => {
    const emailTrimed = email.trim();
    const passwordTrimed = password.trim();
    const confirmPasswordTrimed = confirmPassword.trim();

    e.preventDefault();

    if (type === 'signup') {
      const signUpCreds = {
        email: emailTrimed,
        password: passwordTrimed,
        displayName: 'not needed',
      };

      if (!emailTrimed.length) {
        formDispatch(r.setEmailMes(signUpErrorsMesages.emailMes));
      }

      if (!passwordTrimed.length) {
        formDispatch(r.setPasswordMes(signUpErrorsMesages.paswordMes.required));
      }

      if (!confirmPasswordTrimed.length) {
        formDispatch(r.setConfirmPasswordMes(signUpErrorsMesages.confirmPasswordMes.required));
      }

      if (passwordTrimed.length < 8) {
        formDispatch(r.setPasswordMes(signUpErrorsMesages.paswordMes.minChar));
        formDispatch(r.setConfirmPasswordMes(signUpErrorsMesages.paswordMes.minChar));
      }

      if (!okPassword) {
        formDispatch(r.setPasswordMes(signUpErrorsMesages.paswordMes.match));
        formDispatch(r.setConfirmPasswordMes(signUpErrorsMesages.paswordMes.match));
      }

      if (
        !emailTrimed.length ||
        !passwordTrimed.length ||
        passwordTrimed.length < 8 ||
        !confirmPasswordTrimed.length ||
        !okPassword
      ) {
        return;
      }

      appDispatch(proSignUp(signUpCreds));
    }

    if (type === 'signin') {
      if (!emailTrimed) {
        formDispatch(r.setEmailMes(signInErrorsMessages.emailMes));
      }

      if (!passwordTrimed) {
        formDispatch(r.setPasswordMes(signInErrorsMessages.paswordMes));
      }

      const signInCreds = { email: emailTrimed, password: passwordTrimed };

      if (!emailTrimed || !passwordTrimed) {
        return;
      }

      appDispatch(signIn(signInCreds));
    }
  };

  const handlers: StateHandlers = {
    handleEmail: (email: string) => {
      if (emailMes) formDispatch(r.setEmailMes(''));
      formDispatch(r.setEmail(email));
    },

    handlePass: (pass: string) => {
      if (passwordMes) formDispatch(r.setPasswordMes(''));
      formDispatch(r.setPassword(pass));
    },

    handleConfirmPass: (pass: string) => {
      if (confirmPasswordMes) formDispatch(r.setConfirmPasswordMes(''));
      formDispatch(r.setConfirmPassword(pass));
    },
  };

  useEffect(() => {
    const passwordCheck = password.trim();
    const confirmPasswordCheck = confirmPassword.trim();

    if (!passwordCheck || !confirmPasswordCheck) return formDispatch(r.setOkPassword(false));

    if (passwordCheck && confirmPasswordCheck) {
      passwordCheck === confirmPasswordCheck && passwordCheck.length > 7
        ? formDispatch(r.setOkPassword(true))
        : formDispatch(r.setOkPassword(false));
    }
  }, [password, confirmPassword]);

  return [formStates, handlers, onSubmit];
};
