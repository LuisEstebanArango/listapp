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
    songCtrl.songs        = songsPrepService.list;
    songCtrl.totalItems   = songsPrepService.totalItems;
    songCtrl.currentPage  = songsPrepService.currentPage+1;
    songCtrl.pageChanged  = pageChanged;
    songCtrl.selectSong   = selectSong;
    songCtrl.songSelected = {};
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Canciones';
    }

    function pageChanged(){
      console.log(songCtrl.currentPage);
    }

    function selectSong(song){
      songCtrl.songSelected = song;
      $('#detailSong').modal('show');
    }

  }

})();
