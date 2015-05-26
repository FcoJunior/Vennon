'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('BaseCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
