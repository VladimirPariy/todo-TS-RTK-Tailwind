import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {store} from './store';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
);

