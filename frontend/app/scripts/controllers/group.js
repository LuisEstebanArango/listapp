/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('GroupCtrl', GroupCtrl);

  GroupCtrl.$inject = ['$rootScope'];

  function GroupCtrl($rootScope) {
    var groupCtrl = this;
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Grupos';
    }

  }

})();
