import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Navbar from './navbar.jsx';

import Store from '../src/store';

import Providers from '../src/auth/providers';
import config from './config';

Providers.config = config;

const { Component } = React;

class App extends Component {

  render() {
    return (<div>
              <Navbar />
              <div className="well"><h1>{'This is my home page'}</h1></div>
              <p>{'There is no other home page like it.'}</p>
            </div>);
  }

}


ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>
    , document.querySelector('.container') );

