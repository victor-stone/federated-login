
module.exports = {
  store: require('../store'),
  rootReducer: require('../store/reducers'),
  actions: {
    auth: require('../store/actions/auth'),
    modal: require('../store/actions/modal'),
    profile: require('../store/actions/profile')
  },
  loginPopup: require('../components/login'),
  providers: require('../auth/providers'),
  IdProvider: require('../auth/id-provider'),
  authorizers: require('../auth/authorizers')
};