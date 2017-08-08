/**
 * @author Luis Esteban Arango Sanchez
 **/

(function() {
  'use strict';

  angular
    .module('listapp')
    .service('songService', songService);

  songService.$inject = ['$resource'];

  function songService($resource){
    var SongResource = $resource('/api/songs/:idSong', {}, {
      query: {
        data: '',
        method: 'GET',
        isArray: false,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      update: {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      delete: {
        data: '',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    var service = {
      Song : SongResource,
      getSongs : getSongs,
      getSong  : getSong,
      deleteSong : deleteSong
    }

    function getSongs(page, itemsPerPage){
      return SongResource.query({page: page, itemPerPage: itemsPerPage}).$promise;
    }

    function getSong(idSong) {
      return SongResource.query({idSong: idSong}).$promise;
    }

    function deleteSong(idSong) {
      return SongResource.delete({idSong: idSong}).$promise;
    }

    return service;
  }

})();

