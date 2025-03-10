import React, { FC, PropsWithChildren } from 'react';
import { Loader } from '@launch-ui/loader';

import { useAuthState } from '../hooks/useAuthState';

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { appLoading } = useAuthState();

  if (appLoading) {
    return <Loader view='fullscreen' iconSize='40px' />;
  }

  return <>{children}</>;
};

export { AuthProvider };
