import React             from 'react';
import { connect }       from 'react-redux';
import { defaultStyles } from 'react-modal';

import { 
  setCredentails,
  clearCredentails,
  setProvider
 } from '../store/actions/auth';

import {
  openModal,
  closeModal
} from '../store/actions/modal';

import {
  setProfile
} from '../store/actions/profile';

import Modal from './modal';

import providers from '../auth/providers';

const { Component } = React;

/*
    Quick and dirty Alert box
*/
const Alert = ({error}) => <div className="alert alert-danger"><strong>{'Wups! '}</strong>{error.toString()}</div>;

/*
    <a /> tag to be used anywhere in the site (esp Navbar)
*/
class _Login extends Component {

  constructor() {
    super(...arguments);
    [ 'login', 'logout' ].forEach( n => this[n] = this[n].bind(this) );
  }

  logout(e) {
    e.preventDefault();
    this.props.clearCredentails();
  }

  login(e) {
    e.preventDefault();
    this.props.openModal('login');
  }

  render() {
    const {
      isLoggedIn,
      picture
    } = this.props;

    return( 
        isLoggedIn
          ? <a href='#' onClick={this.logout}>{'Logout'}{picture && <img className="profile-pic" src={picture} />}</a>
          : <a href='#' onClick={this.login}> {'Log in'}</a>      
      );
  }
}

const mapStateToProps    = s => ({ isLoggedIn: s.auth.authenticated, picture: s.profile && s.profile.picture });

const mapDispatchToProps = {  clearCredentails, 
                              openModal
                            };

const Login  = connect( mapStateToProps, mapDispatchToProps )(_Login);



class Popup extends Component {

  constructor() {
    super(...arguments);
    [ 'login', 'error' ].forEach( n => this[n] = this[n].bind(this) );
    this.state = { error: null };
  }

  error(error) {
    this.setState( {error} );
  }

  login(provider) {
    
    const {
      setCredentails,
      setProvider,
      setProfile
    } = this.props;

    setProfile(provider.profile); 
    setCredentails(provider.credentials);
    setProvider(provider.name);

    this.props.closeModal();
  }

  render() {

    const {
      error
    } = this.state;

    const providerProps = {
      error: this.error,
      authenticated: this.login,
      notAuthenticated: this.logout
    };

    return (
      <Modal name="login" contentLabel="Login">
        {error && <Alert error={error} />}
        <ul className="list-group">{[...providers].map( (p,i) => <ul className="list-group-item" key={i}>{p.ux(providerProps)}</ul>)}</ul>
      </Modal>);
  }

}

const mapStateToProps2    = s => ({ isLoggedIn: s.auth.authenticated });

const mapDispatchToProps2 = {  setCredentails, 
                               clearCredentails, 
                               setProvider,
                               setProfile,
                               closeModal
                            };

Login.Popup = connect( mapStateToProps2, mapDispatchToProps2 )(Popup);

Login.Popup.defaultStyles = defaultStyles;

module.exports =  Login;
