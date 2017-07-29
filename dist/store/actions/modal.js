'use strict';

var OPEN_MODAL = 'OPEN_MODAL';
var CLOSE_MODAL = 'CLOSE_MODAL';

function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}

function openModal(name) {
  return {
    type: OPEN_MODAL,
    name: name
  };
}

module.exports = {
  closeModal: closeModal,
  openModal: openModal,

  OPEN_MODAL: OPEN_MODAL,
  CLOSE_MODAL: CLOSE_MODAL
};