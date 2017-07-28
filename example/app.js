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
              {this.props.children}
            </div>);
  }

}

class Home extends Component {
  render() {
    return (<div className="well"><h1>{'This is home page'}</h1></div>);
  }
}

ReactDOM.render(
  <Provider store={Store}>
    <App>
      <Home />
    </App>
  </Provider>
    , document.querySelector('.container') );

