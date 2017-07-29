'use strict';

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// All actions will flow through each middleware until it reaches the 
// end to be passed to Redux reducers
// applyMiddleware() is used to allow for async 

var store = (0, _redux.createStore)(_reducers2.default,

// reduxThunk allows us to store functions inside our actions (instead of 
// only objects). Without reduxThunk we could only use very simple actions

(0, _redux.applyMiddleware)(_reduxThunk2.default),

// tool for visualizing 
// Redux state changes in the browser console

(0, _redux.applyMiddleware)((0, _reduxLogger2.default)()));

module.exports = store;