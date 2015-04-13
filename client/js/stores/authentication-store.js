'use strict';

// !! hand waving !!
// we would normally get this from an authorized session via a server side action
module.exports = function () {
  return {
    getCurrentUser: function () {
      return {
        id: 1,
      }
    }
  }
}
