import React, { FC, PropsWithChildren } from 'react';

import { useAuthState } from '../hooks/useAuthState';

import { Loader } from '../features/loader';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { appLoading } = useAuthState();

  if (appLoading) {
    return <Loader view='fullscreen' iconSize='56px' color='#1e1c1e' />;
  }

  return <>{children}</>;
};

export { AuthProvider };
