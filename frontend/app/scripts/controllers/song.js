/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('SongCtrl', SongCtrl);

  SongCtrl.$inject = ['$rootScope', 'songsPrepService', 'songService'];

  function SongCtrl($rootScope, songsPrepService, songService) {
    var songCtrl          = this;
    songCtrl.songs        = songsPrepService.list;
    songCtrl.totalItems   = songsPrepService.totalItems;
    songCtrl.currentPage  = songsPrepService.currentPage+1;
    songCtrl.pageChanged  = pageChanged;
    songCtrl.selectSong   = selectSong;
    songCtrl.deleteSong   = deleteSong;
    songCtrl.songSelected = {};
    activate();

    function activate(){
      $rootScope.titleNavbar = 'Canciones';
    }

    function pageChanged(){
      console.log(songCtrl.currentPage);
    }

    function selectSong(song){
      songService.getSong(song.id).then(function (data){
        songCtrl.songSelected = data;
      $('#detailSong').modal('show');
      }).catch(function (error){
        console.error(error); //TODO contacte a soporte
      });
    }

    function deleteSong(song){
      // TODO sweetalert
      songService.deleteSong(song.id).then(function (data){
        alert("eliminado correctamente");
      }).catch(function (error){
        console.error(error);//TODO contacte a soporte
      });
    }

  }

})();
