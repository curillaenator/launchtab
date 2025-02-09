import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Layout } from './layout';
import { LaunchTabs, Notes } from './pages';

import './index.css';

const appContainer = document.querySelector('#root') as Element;
const root = createRoot(appContainer);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<LaunchTabs />} />
      <Route path='/notes' element={<Notes />} />
    </Route>,
  ),
);

root.render(<RouterProvider router={router} fallbackElement={<div>подождите...</div>} />);
