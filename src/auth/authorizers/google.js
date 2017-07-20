import React from 'react';
/* globals gapi */

import IdProvider from '../id-provider';

class GoogleLoginButton extends React.Component {

  componentDidMount() {
    window.gapi && gapi.signin2.render('gsignup',
      {
        onsuccess: 'googleLogin'
      });
  }

  render() {
    return (<div className="g-signin2" id="gsignup" data-onsuccess="googleLogin" data-theme="dark"/>);
  }
}

class GoogleLogin extends IdProvider {

  constructor() {
    super({...arguments, name:'google'});
    this._accessToken = null;
    window.googleLogin = this.getStatus.bind(this);
  }

  get loginDescriptor() {
    return this._accessToken && { 'accounts.google.com': this._accessToken } ;
  }

  get ux() {
    return props => {
      console.log('ux props', props); // eslint-disable-line
      this.props = { ...props };
      return <GoogleLoginButton />;
    };
  }

  logout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut(); // <--promise
  }
  
  getStatus(googleUser) {

    // if (authResult['status']['signed_in']) {    
    // authResult['id_token']

    if( googleUser ) {
      console.log('googleuser', googleUser); // eslint-disable-line
      this._accessToken = googleUser.getAuthResponse().id_token;
      var profile = googleUser.getBasicProfile();
      const fields = {
        email: profile.getEmail(),
        picture: profile.getImageUrl(),
        first_name: profile.getName()
      };
      this.onAuthorized(fields);
    } else {
      this._accessToken = null;
      this.onNotAuthorized();
    }
  }

}

module.exports = new GoogleLogin();

