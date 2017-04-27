/**
 * @author Luis Esteban Arango
 * Main module of the application.
 **/

(function (){

  'use strict';

  var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  angular
    .module('listapp', [
      'ui.router',
      'ngResource'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider){

      $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('X-CSRF-TOKEN');

      $urlRouterProvider.otherwise("/dashboard");

      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl',
              resolve: {
                AutoLoginCheck: ['$state', '$window', '$timeout', '$q', '$rootScope', function ($state, $window, $timeout, $q, $rootScope) {
                        var deferred = $q.defer();
                        if(!$rootScope.isLogged()){
                             deferred.resolve();
                        }else{
                          $timeout(function(){
                            $state.go('dashboard');
                          }, 0);
                          deferred.reject();
                        }
                        return deferred.promise;
                    }]
              }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboardCtrl',
              resolve: {
                isLogged : isLogged
              }
        });
    })
    .run(['$state', '$rootScope', '$http', function($state, $rootScope, $http){

        $rootScope.setToken = function(token){
          Cookies.set('X-CSRF-TOKEN', token, { expires: 7 });
          $http.defaults.headers.common['X-CSRF-TOKEN'] = token;
        };

        $rootScope.isLogged = function(){ // verificar localmente (cookie)
          console.log("afd");
          return false;
        };

    }]);

  function isLogged($state, $window, $timeout, $q, $rootScope){

    var deferred = $q.defer();
    if($rootScope.isLogged()){
         deferred.resolve();
    }else{
      $timeout(function(){
        $state.go('login');
      }, 0);
      deferred.reject();
    }
    return deferred.promise;

  }


})();