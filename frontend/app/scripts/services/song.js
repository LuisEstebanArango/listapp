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
    var SongResource = $resource('/api/songs/:songId', {}, {
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
      getSongs : getSongs
    }

    function getSongs(page, itemsPerPage){
      return SongResource.query({page: page, itemPerPage: itemsPerPage}).$promise;
    }

    return service;
  }

})();

