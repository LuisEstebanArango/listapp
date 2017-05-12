/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('MessageCtrl', MessageCtrl);

  MessageCtrl.$inject = ['$rootScope'];

  function MessageCtrl($rootScope) {
    var messageCtrl = this;
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Mensajes';
    }

  }

})();
