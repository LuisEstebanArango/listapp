/**
 * @author luis esteban arango sanchez
 */
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$state', '$http', '$rootScope'];

  function DashboardCtrl($state, $http, $rootScope){

    var dashboardCtrl = this;

    dashboardCtrl.title       = 'title';
    dashboardCtrl.username    = '';
    dashboardCtrl.password    = '';
    dashboardCtrl.msgError    = '';
    dashboardCtrl.logout      = logout;
    dashboardCtrl.login       = login;

    activate();

    function activate() {

    }

    function login(){
      $http({
        method: 'POST',
        data: {
          username: dashboardCtrl.username,
          password: dashboardCtrl.password,
        },
        url: '/api/authenticate'
      }).then(function successCallback(response) {
        if(!response.data.success)
          dashboardCtrl.msgError = response.data.message;
        else{
          dashboardCtrl.msgError = '';
          $rootScope.setToken(response.data.token);
          $state.go('dashboard');
        }
      }, function errorCallback(response) {
        dashboardCtrl.msgError = "Error interno. Por favor comuniquese con soporte.";
      });
    }

    function logout() {
      return loginService.logout().success(function() {
        $window.location.href = '/';
      });
    }
  }
})();
