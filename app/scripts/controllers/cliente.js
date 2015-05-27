'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:ClienteCtrl
 * @description
 * # ClienteCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('ClienteCtrl',['$scope', '$http', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.cliente = {};
    $scope.cliente = [];
    $http.get('scripts/mocks/estados.json').success(function(data){
      $scope.estados = data;
    });
    $http.get('http://localhost:16979/api/cliente').success(function(data){
      $scope.AllClient = data;
    });

    $scope.send = function(cliente){
      console.log(cliente);
    };
  }]);
