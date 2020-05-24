import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import TranslateProvider from './i18n/TranslateProvider';

import './styles/index.css';
import { defaultTheme } from './styles/themes';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <TranslateProvider>
      <ThemeProvider theme={defaultTheme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </TranslateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
