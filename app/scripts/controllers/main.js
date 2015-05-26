'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
