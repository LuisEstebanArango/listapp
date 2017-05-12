/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('ListCtrl', ListCtrl);

  ListCtrl.$inject = ['$rootScope'];

  function ListCtrl($rootScope) {
    var listCtrl = this;
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Listas';
    }

  }

})();
