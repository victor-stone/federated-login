import React from 'react';
import ReactDOM from 'react-dom';

import { 
  Router, 
  Route, 
  IndexRoute, 
  browserHistory 
} from 'react-router';

import { Provider } from 'react-redux';

import Login from './components/login';
import Navbar from './components/navbar';

import Store from './store';


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
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/login' component={Login} />
      </Route>
    </Router>
  </Provider>
    , document.querySelector('.container') );

