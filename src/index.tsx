import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Layout } from './layout';
import { LaunchTabs, Notes } from './pages';
import { Loader } from './features/loader';

import { ROOT_ROUTE, NOTES_ROUTE } from './routes';

import './index.css';

const appContainer = document.querySelector('#root') as Element;
const reactRoot = createRoot(appContainer);

const client = new QueryClient();

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
    <RouterProvider router={router} fallbackElement={<Loader view='fit-parent' iconSize='56px' />} />
  </QueryClientProvider>,
);
