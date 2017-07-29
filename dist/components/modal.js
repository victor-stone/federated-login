'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactRedux = require('react-redux');

var _modal = require('../store/actions/modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Modal = function (_React$Component) {
  _inherits(_Modal, _React$Component);

  function _Modal() {
    _classCallCheck(this, _Modal);

    return _possibleConstructorReturn(this, (_Modal.__proto__ || Object.getPrototypeOf(_Modal)).apply(this, arguments));
  }

  _createClass(_Modal, [{
    key: 'handleCloseModal',
    value: function handleCloseModal() {
      this.props.closeModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$closeCaption = _props.closeCaption,
          closeCaption = _props$closeCaption === undefined ? 'Cancel' : _props$closeCaption,
          _props$closeButton = _props.closeButton,
          closeButton = _props$closeButton === undefined ? null : _props$closeButton,
          name = _props.name,
          _name = _props._name;


      if (name !== _name) {
        return null;
      }

      var props = _extends({}, this.props);
      ['closeButton', 'closeCaption', 'closeModal', 'children'].forEach(function (p) {
        return props[p] && delete props[p];
      });

      return _react2.default.createElement(
        _reactModal2.default,
        props,
        this.props.children,
        !closeButton && _react2.default.createElement(
          'button',
          { onClick: this.handleCloseModal.bind(this) },
          closeCaption
        ),
        closeButton
      );
    }
  }]);

  return _Modal;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(s) {
  return { isOpen: s.modal.open, _name: s.modal.name };
};
var mapDispatchToProps = { closeModal: _modal.closeModal };

var Modal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Modal);

Modal.defaultStyles = _Modal.defaultStyles;

module.exports = Modal;