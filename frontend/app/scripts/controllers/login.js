/**
 * @author luis esteban arango sanchez
 */
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$state', '$http', '$rootScope'];

  function LoginCtrl($state, $http, $rootScope){

    var loginCtrl = this;

    loginCtrl.title       = 'title';
    loginCtrl.username    = '';
    loginCtrl.password    = '';
    loginCtrl.msgError    = '';
    loginCtrl.logout      = logout;
    loginCtrl.login       = login;

    activate();
    ///////////////////

    function activate() {

    }

    function login(){
      $http({
        method: 'POST',
        data: {
          username: loginCtrl.username,
          password: loginCtrl.password,
        },
        url: '/api/authenticate'
      }).then(function successCallback(response) {
        if(!response.data.success)
          loginCtrl.msgError = response.data.message;
        else{
          loginCtrl.msgError = '';
          $rootScope.setToken(response.data.token);
          $state.go('dashboard');
        }
      }, function errorCallback(response) {
        loginCtrl.msgError = "Error interno. Por favor comuniquese con soporte.";
      });
    }

    function logout() {
      return loginService.logout().success(function() {
        $window.location.href = '/';
      });
    }
  }
})();
