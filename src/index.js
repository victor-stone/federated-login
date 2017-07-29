
const fakeLogin = () => {};
fakeLogin.Popup = () => {};
fakeLogin.defaultStyles = { content: {}, overlay: {} };

class FederatedLoginsLib {

  set quietMode(flag) {
    this._quietMode = flag;
  }

  get quietMode() {
    return this._quietMode;
  }

  get store() {
    return require('./store');
  }

  get loginReducers() {
    return require('./store/reducers');
  }

  get actions() {
    return {
      auth: require('./store/actions/auth'),
      modal: require('./store/actions/modal'),
      profile: require('./store/actions/profile'),
    };
  }

  get loginPopup() {
    return this._quietMode
              ? fakeLogin
              : require('./components/login');
  }

  get providers() {
    const providers = require('./auth/providers');
    providers.quietMode = this._quietMode;
    return providers;
  }

  get IdProvider() {
    return require('./auth/id-provider');
  }
  
  get authorizers() {
    return require('./auth/authorizers');
  }
}

module.exports = new FederatedLoginsLib();

