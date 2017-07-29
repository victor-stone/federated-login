'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global AWS */

var IDAuthorizationProviders = function () {
  function IDAuthorizationProviders() {
    _classCallCheck(this, IDAuthorizationProviders);
  }

  _createClass(IDAuthorizationProviders, [{
    key: 'add',
    value: function add(provider) {
      if (!this._quietMode) {
        provider.config = this._config;
        this.providers.push(provider);
      }
    }
  }, {
    key: 'find',
    value: function find(name) {
      return this.providers.find(function (p) {
        return p.name === name;
      });
    }
  }, {
    key: Symbol.iterator,
    value: function value() {

      var p = [].concat(_toConsumableArray(this.providers));
      return {
        current: 0,
        last: p.length - 1,

        next: function next() {
          if (this.current <= this.last) {
            return { done: false, value: p[this.current++] };
          } else {
            return { done: true };
          }
        }
      };
    }
  }, {
    key: 'quiteMode',
    set: function set(flag) {
      this._quietMode = flag;
    }
  }, {
    key: 'providers',
    get: function get() {
      if (this._quietMode) {
        return [];
      }

      if (!this.__providers) {
        var authorizers = require('./authorizers');
        this.__providers = Object.keys(authorizers).filter(function (key) {
          return key !== 'default';
        }).map(function (key) {
          return authorizers[key];
        });
      }

      return this.__providers;
    }
  }, {
    key: 'config',
    set: function set(_ref) {
      var _this = this;

      var REGION = _ref.REGION,
          IDENTITY_POOL_ID = _ref.IDENTITY_POOL_ID,
          otherstuff = _objectWithoutProperties(_ref, ['REGION', 'IDENTITY_POOL_ID']);

      AWS.config.update({
        region: REGION
      });
      this._config = _extends({ REGION: REGION, IDENTITY_POOL_ID: IDENTITY_POOL_ID }, otherstuff);
      this.providers.forEach(function (p) {
        return p.config = _this._config;
      });
    }
  }]);

  return IDAuthorizationProviders;
}();

var providers = new IDAuthorizationProviders();

module.exports = providers;