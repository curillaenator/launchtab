import React, { FC, Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

import { TextInput } from "../../inputs/TextInput";

import { icons } from "../../../assets/icons";

import type { ILookFeelActions, ISettingsState } from "../reducer";

const animation = keyframes`${fadeIn}`;
const OtherStyled = styled.div`
  width: 100%;
  min-height: 320px;
  animation: ${animation} 0.2s linear;
`;

interface IOther {
  values: ISettingsState["other"];
  // setters: ILookFeelActions;
  dispatch: Dispatch<AnyAction>;
}

export const Other: FC<IOther> = () => {
  return <OtherStyled>Other</OtherStyled>;
};
