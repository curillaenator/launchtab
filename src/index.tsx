import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { App } from './components/app/App';

import './index.css';

const appContainer = document.querySelector('#root') as Element;
const root = createRoot(appContainer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
