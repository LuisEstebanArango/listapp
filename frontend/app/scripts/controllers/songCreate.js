/**
 * @author Luis Esteban Arango Sanchez
 **/
(function () {
  'use strict';

  angular
    .module('listapp')
    .controller('SongCreateCtrl', SongCreateCtrl);

  SongCreateCtrl.$inject = ['$rootScope', 'songService'];

  function SongCreateCtrl($rootScope, songService) {
    var songCreateCtrl          = this;
    activate();

    function activate(){
    }

  }

})();
