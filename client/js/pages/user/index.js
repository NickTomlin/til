'use strict';

module.exports = function ($stateParams, UserStore) {
  function handleUserUpdate () {
    this.user = UserStore.getByDisplayName($stateParams.username);
  }

  console.log('User');

  UserStore.addChangeListener(handleUserUpdate.bind(this));
};
