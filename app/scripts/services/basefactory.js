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
    
    function show(path){
      return $http.get(config.server + path);
    };

    // Public API here
    return {
      create: create,
      show: show
    };
  }]);
