'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:ClienteCtrl
 * @description
 * # ClienteCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('ClienteCtrl',['$scope', 'baseFactory', function ($scope, baseFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    baseFactory.show('cliente').success(function (data) {
      $scope.AllClient = data;
    });

    $scope.send = function(cliente){
      console.log(cliente);
    };
  }]);
