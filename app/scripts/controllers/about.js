'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
