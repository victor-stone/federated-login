import React  from 'react';
import Login  from '../src/components/login.jsx';

import Modal from 'react-modal';

Modal.defaultStyles.content.width = '50%';
Modal.defaultStyles.content.margin = 'auto';

const { Component } = React;

class Navbar extends Component {

  componentDidMount() {
    /* globals $ */
    $('.navbar a').on('click', function(){
       $('.nav').find('.active').removeClass('active');
       $(this).parent().addClass('active');
    });    
  }

  render() {

    return (<nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' to='/'>Test Federated Login</a>
        </div>
        <ul className='nav navbar-nav'>
          <li><a className="active" href='/'>Home</a></li>
          <li><Login /></li>
        </ul>
        <Login.Popup />
      </div>
    </nav>);
  }
}

module.exports = Navbar;
