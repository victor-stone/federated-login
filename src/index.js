import store from './store';
import loginReducers from './store/reducers';
import auth from './store/actions/auth';
import modal from './store/actions/modal';
import profile from './store/actions/profile';
import loginPopup from './components/login';
import providers from './auth/providers';
import IdProvider from './auth/id-provider';
import authorizers from './auth/authorizers';

module.exports = {
  store,
  loginReducers,
  actions: {
    auth,
    modal,
    profile,
  },
  loginPopup,
  providers,
  IdProvider,
  authorizers
};