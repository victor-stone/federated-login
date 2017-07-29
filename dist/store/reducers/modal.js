'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _modal = require('../actions/modal');

var INITIAL_STATE = {
  open: false,
  name: null
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];


  switch (action.type) {
    case _modal.OPEN_MODAL:
      return _extends({}, state, {
        open: true,
        name: action.name
      });

    case _modal.CLOSE_MODAL:
      {
        return _extends({}, state, {
          open: false,
          name: null
        });
      }
  }
  return state;
};

module.exports = reducer;