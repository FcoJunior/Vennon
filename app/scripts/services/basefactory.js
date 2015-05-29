'use strict';

/**
 * @ngdoc service
 * @name vennonApp.baseFactory
 * @description
 * # baseFactory
 * Factory in the vennonApp.
 */
angular.module('vennonApp')
  .factory('baseFactory',['$http', 'config', function ($http, config) {
    // Service logic
    // ...
    
    function create(path, entity){
      return $http.post(config.server + path, entity);
    };
    
    function update(path, entity){
      return $http.put(config.server + path, entity);
    };
    
    function show(path){
      return $http.get(config.server + path);
    };
    
    function destroy(path){
      return $http.delete(config.server + path);
    };

    // Public API here
    return {
      create: create,
      update: update,
      destroy: destroy,
      show: show
    };
  }]);
