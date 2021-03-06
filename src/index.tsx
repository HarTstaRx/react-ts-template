import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import TranslateProvider from './i18n/TranslateProvider';
import StateProvider from './shared/store/StateProvider';

import './styles/index.css';
import { defaultTheme } from './styles/themes';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <TranslateProvider>
      <StateProvider>
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </StateProvider>
    </TranslateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
