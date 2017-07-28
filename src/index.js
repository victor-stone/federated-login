
module.exports = {
  store: require('../store'),
  reducers: require('../store/reducers'),
  loginPopup: require('../components/login'),
  providers: require('../auth/providers'),
  idProvider: require('../auth/id-provider'),
  authorizers: require('../auth/authorizers')
};