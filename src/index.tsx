import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { store } from './redux/store';
import { Layout } from './layout';
import { LaunchTabs } from './pages/LaunchTabsV2';

import './index.css';

const appContainer = document.querySelector('#root') as Element;
const root = createRoot(appContainer);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<LaunchTabs />} />
    </Route>,
  ),
);

root.render(
  // @ts-expect-error
  <Provider store={store}>
    <RouterProvider router={router} fallbackElement={<div>подождите...</div>} />
  </Provider>,
);
