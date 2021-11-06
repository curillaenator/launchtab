// ЭТО ФАЙЛ МЕНЯТЬ НЕЛЬЗЯ!!!! НИКАК!!! НИ ПОД КАКИМ ПРЕДЛОГОМ!!! КАТЕГОРИЧЕСКИ НЕЛЬЗЯ!!!!!!!
// ЭТО ФАЙЛ МЕНЯТЬ НЕЛЬЗЯ!!!! НИКАК!!! НИ ПОД КАКИМ ПРЕДЛОГОМ!!! КАТЕГОРИЧЕСКИ НЕЛЬЗЯ!!!!!!!
// ЭТО ФАЙЛ МЕНЯТЬ НЕЛЬЗЯ!!!! НИКАК!!! НИ ПОД КАКИМ ПРЕДЛОГОМ!!! КАТЕГОРИЧЕСКИ НЕЛЬЗЯ!!!!!!!
// ЭТО ФАЙЛ МЕНЯТЬ НЕЛЬЗЯ!!!! НИКАК!!! НИ ПОД КАКИМ ПРЕДЛОГОМ!!! КАТЕГОРИЧЕСКИ НЕЛЬЗЯ!!!!!!!

import type { SyntheticEvent, ReactNode } from "react";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import type { TState } from "../redux/store";

// API

export interface ISignInCreds {
  email: string;
  password: string;
}

export interface ISignUpCreds extends ISignInCreds {
  displayName: string;
}

export interface IUpdate {
  uid: string;
  tabs: IData[];
}

// COMMON

export interface IBookmark {
  id?: string;
  name: string;
  deleted?: boolean;
  link: string;
  imageURL?: string | null;
  iconURL?: string | null;
}

export interface IData {
  name: string;
  pages: IBookmark[];
}

// REDUX & STATE

export type TReducer<S, A = AnyAction> = (state: S, action: A) => S; // localc state reducer

export type TAction<P> = (payload: P) => { type: string; payload: P }; // action creator

export type TThunk = ThunkAction<void, TState, unknown, AnyAction>; // thunk

// EVENTS

export type TEventHandler<E extends SyntheticEvent<any>> = (event: E) => void;
