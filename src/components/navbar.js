import React        from 'react';
import { Link }     from 'react-router';
import { connect }  from 'react-redux';

import {
  logoutUser
} from '../store/actions/auth';

const { Component } = React;

class Navbar extends Component {

  constructor() {
    super(...arguments);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    /* globals $ */
    $('.navbar a').on('click', function(){
       $('.nav').find('.active').removeClass('active');
       $(this).parent().addClass('active');
    });    
  }

  logout(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {

    const {
      isLoggedIn,
      firstName,
      picture
    } = this.props;

    return (<nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link className='navbar-brand' to='/'>Test Federated Login</Link>
        </div>
        <ul className='nav navbar-nav'>
          <li><Link className="active" to='/'>Home</Link></li>
          <li>
            {isLoggedIn
                ? <a onClick={this.logout}><img src={picture} style={{width:16,height:16}} />{'Logout'}</a>
                : <Link to='/login'>{'Login'}</Link>
            }
          </li>
          {isLoggedIn && <li><a href='#'>{`logged in as ${firstName}`}</a></li>}
        </ul>
      </div>
    </nav>);
  }
}

const mapStateToProps    = s => { return { 
                                    isLoggedIn: s.auth.authenticated,
                                    firstName:  s.auth.user.first_name,
                                    picture:    s.auth.user.picture
                                  }; };
const mapDispatchToProps = {  logoutUser   };

const connectedNavBar = connect( mapStateToProps, mapDispatchToProps )( Navbar );

module.exports = connectedNavBar;