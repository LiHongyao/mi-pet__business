import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom';


import 'antd-mobile/dist/antd-mobile.css';
import 'amfe-flexible'
import './assets/css/global.css'

import Validator from './utils/validator'


import App from './App';
import NotWeixin from './pages/NotWeixin'
import * as serviceWorker from './serviceWorker';

import { Toast } from 'antd-mobile'
Toast.config({
  duration: 2
});


const _App = Validator.weixin() ?  (
  <App />
) : (
  <NotWeixin />
);



ReactDOM.render(
   _App,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
