/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$rootScope'];

  function ProfileCtrl($rootScope) {
    var profileCtrl = this;
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Perfil';
    }

  }

})();
