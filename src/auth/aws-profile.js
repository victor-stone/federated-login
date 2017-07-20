
const REGION           = 'us-west-2';
const USER_POOL_ID     = 'us-west-2_Q7ejCW5el';
const CLIENT_ID        = '2cdrj70ihn5lc70c446g4odr3s';
const IDENTITY_POOL_ID = 'us-west-2:544ed35f-6bdb-4e28-b9a2-fca1ddbc4e7b';
const USERPOOL_URN     = 'cognito-idp.'+REGION+'.amazonaws.com/'+USER_POOL_ID;

module.exports = {
  REGION,
  CLIENT_ID,
  USERPOOL_URN,
  IDENTITY_POOL_ID
};