import React, { FC, PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { useAuthState } from './hooks/useAuthState';

import { Layout } from './layout';
import { LaunchTabs, Notes } from './pages';
import { Loader } from './features/loader';

import { ROOT_ROUTE, NOTES_ROUTE } from './routes';

import './index.css';

const fallbackLoader = <Loader view='fullscreen' iconSize='56px' color='#1e1c1e' />;

const appContainer = document.querySelector('#root') as Element;
const reactRoot = createRoot(appContainer);

const client = new QueryClient();

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { appLoading } = useAuthState();

  if (appLoading) return fallbackLoader;

  return <>{children}</>;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT_ROUTE} element={<Layout />}>
      <Route index element={<LaunchTabs />} />
      <Route path={NOTES_ROUTE} element={<Notes />} />
    </Route>,
  ),
);

reactRoot.render(
  <QueryClientProvider client={client}>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={fallbackLoader} />
    </AuthProvider>
  </QueryClientProvider>,
);
