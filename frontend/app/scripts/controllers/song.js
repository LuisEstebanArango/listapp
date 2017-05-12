/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('SongCtrl', SongCtrl);

  SongCtrl.$inject = ['$rootScope'];

  function SongCtrl($rootScope) {
    var songCtrl = this;
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Canciones';
    }

  }

})();
