'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProfile = setProfile;
var SET_PROFILE = exports.SET_PROFILE = 'SET_PROFILE';

function setProfile(profile) {
  return { type: SET_PROFILE, profile: profile };
}