import React from 'react';
/* globals FB */

import IdProvider from '../id-provider';

class FacebookLoginButton extends React.Component {

  componentDidMount() {
    window.FB && FB.XFBML.parse();
  }

  render() {

    const {
      size = 'large',
      type = FacebookLogin.types.LOGIN_WITH,
      profilePick = false,
      friends = false,
      width = undefined,
      autoLogout = 'false'
    } = this.props;

    const bool = { [true]: 'true', [false]: 'false' };

    return (<div className="fb-login-button" 
                 data-max-rows="1" 
                 data-width={width}
                 data-size={size}
                 data-button-type={type}
                 data-show-faces={bool[friends]}
                 data-auto-logout-link={bool[autoLogout]}
                 data-use-continue-as={bool[profilePick]}
                 data-scope="public_profile,email"
                 data-onlogin="checkloginState();"
            />);
  }
}

const FACEBOOK_CLIENT_ID = '115757859022458';

class FacebookLogin extends IdProvider {

  constructor() {
    super({...arguments, name:'facebook'});
    this._accessToken = null;
    window.checkloginState = this.getStatus.bind(this);
    window.fbAsyncInit = function() {
      FB.init({
        appId            : FACEBOOK_CLIENT_ID,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.9'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=' + FACEBOOK_CLIENT_ID;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));    
  }

  get loginDescriptor() {
    return this._accessToken && { 'graph.facebook.com': this._accessToken } ;
  }


  get ux() {
    return props => {
      this.props = { ...props };
      return <FacebookLoginButton  />;
    };
  }

  logout() {
    FB.logout();
  }
  
  getStatus() {
    FB.getLoginStatus( response => {
        if( response.status === 'connected' ) {
            this._accessToken = response.authResponse.accessToken;

            FB.api( '/me', 
                    { 
                      fields: 'email,first_name,last_name,picture'
                    }, 
                    fields => this.onAuthorized( {...fields, picture: fields.picture.data.url } ) );
        } else {
          this._accessToken = null;
          this.onNotAuthorized();
        }
      });      
  }

}

FacebookLogin.types = {
  LOGIN_WITH: 'login_with',
  CONTINUE_WITH: 'continue_with'
};


module.exports = new FacebookLogin();

