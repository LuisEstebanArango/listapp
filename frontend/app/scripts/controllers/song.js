/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('SongCtrl', SongCtrl);

  SongCtrl.$inject = ['$rootScope', 'songsPrepService'];

  function SongCtrl($rootScope, songsPrepService) {
    var songCtrl          = this;
    songCtrl.songs        = songsPrepService;
    activate();

    function activate(){
      console.log(songCtrl.songsPrepService);
      $rootScope.titleNavbar = 'Canciones';
    }

  }

})();
