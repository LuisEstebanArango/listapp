/**
 * @author Luis Esteban Arango Sanchez
 */

(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$state', '$http', '$rootScope'];

    function MainCtrl ($state, $http, $rootScope){

      var mainCtrl = this;
      mainCtrl.openSideBar = false; // abre el sidebar
      mainCtrl.clickFloatButton1 = clickFloatButton1;  //boton  flotante
      mainCtrl.titleNavbar = "Dashboard";

      function clickFloatButton1(){
        angular.element( document.querySelector('#help-actions')).addClass('active');
      }

    }

})();
