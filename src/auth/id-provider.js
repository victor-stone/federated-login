
/* global AWS */

import Profile from './aws-profile';

AWS.config.update({
  region: Profile.REGION
});


class IdProvider {

  constructor({name}) {
    this._fields = {};
    this._name = name;
  }

  get loginDescriptor() {
    throw 'derived class of IdProvider must implement loginDescriptor';
  }

  ux(props) { // eslint-disable-line
    throw 'derived class of IdProvider must implement ux';
  }

  get name() {
    return this._name;
  }
  
  get fields() {
    return this._fields;
  }
  
  logout() {

  }

  onAuthorized(fields) {

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({

        IdentityPoolId: Profile.IDENTITY_POOL_ID,
        Logins: this.loginDescriptor
      });

      const {
        authenticated,
        error
      } = this.props;

      /*
          Lot of moving parts behind the scenes:

          These are AWS APIs served from AWS-SDK (which is 
          not the same as individual SDKs)

            - CognitoIdentityCredentials ('Credentials' object)

            - CognitoIdentity ('Service')
                getId()
                getCredentialsForIdentity()
                
            - CognitoIdentityServiceProvider ('Service')
            - STS ('Service')


      */
      AWS.config.credentials.get( (err) => {
        if( err ) {
          error && error(err);
        } else {
          AWS.config.credentials.identityId && 
            authenticated && 
            (this._fields = fields) &&
            authenticated(this);
        }
      });
  }

  onNotAuthorized() {
   
    const {
      notAuthenticated
    } = this.props;

    notAuthenticated && notAuthenticated();
  }

}


module.exports = IdProvider;