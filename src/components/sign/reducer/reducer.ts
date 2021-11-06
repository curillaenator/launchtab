import { TReducer, TAction } from "../../../types/types";

const SET_USER_EMAIL = "sign/SET_USER_EMAIL";
const SET_USER_EMAIL_MESSAGE = "sign/SET_USER_EMAIL_MESSAGE";

const SET_USER_PASSWORD = "sign/SET_USER_PASSWORD";
const SET_USER_PASSWORD_MESSAGE = "sign/SET_USER_PASSWORD_MESSAGE";

const SET_USER_CONFIRM_PASSWORD = "sign/SET_USER_CONFIRM_PASSWORD";
const SET_USER_CONFIRM_PASSWORD_MESSAGE =
  "sign/SET_USER_CONFIRM_PASSWORD_MESSAGE";

const SET_USER_OK_PASSWORD = "sign/SET_USER_OK_PASSWORD";

export interface IFormState {
  email: string;
  emailMes: string;

  password: string;
  passwordMes: string;

  confirmPassword: string;
  confirmPasswordMes: string;

  okPassword: boolean;
}

export const initialState: IFormState = {
  email: "",
  emailMes: "",

  password: "",
  passwordMes: "",

  confirmPassword: "",
  confirmPasswordMes: "",

  okPassword: false,
};

export const reducer: TReducer<IFormState> = (state, action) => {
  switch (action.type) {
    case SET_USER_EMAIL:
      return { ...state, email: action.payload };
    case SET_USER_EMAIL_MESSAGE:
      return { ...state, emailMes: action.payload };

    case SET_USER_PASSWORD:
      return { ...state, password: action.payload };
    case SET_USER_PASSWORD_MESSAGE:
      return { ...state, passwordMes: action.payload };

    case SET_USER_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };
    case SET_USER_CONFIRM_PASSWORD_MESSAGE:
      return { ...state, confirmPasswordMes: action.payload };

    case SET_USER_OK_PASSWORD:
      return { ...state, okPassword: action.payload };

    default:
      return state;
  }
};

// ACTIONS

export const setEmail: TAction<string> = (payload) => ({
  type: SET_USER_EMAIL,
  payload,
});

export const setEmailMes: TAction<string> = (payload) => ({
  type: SET_USER_EMAIL_MESSAGE,
  payload,
});

export const setPassword: TAction<string> = (payload) => ({
  type: SET_USER_PASSWORD,
  payload,
});

export const setPasswordMes: TAction<string> = (payload) => ({
  type: SET_USER_PASSWORD_MESSAGE,
  payload,
});

export const setConfirmPassword: TAction<string> = (payload) => ({
  type: SET_USER_CONFIRM_PASSWORD,
  payload,
});

export const setConfirmPasswordMes: TAction<string> = (payload) => ({
  type: SET_USER_CONFIRM_PASSWORD_MESSAGE,
  payload,
});

export const setOkPassword: TAction<boolean> = (payload) => ({
  type: SET_USER_OK_PASSWORD,
  payload,
});
