'use strict';

/**
 * @ngdoc overview
 * @name vennonApp
 * @description
 * # vennonApp
 *
 * Main module of the application.
 */
var app = angular
  .module('vennonApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.utils.masks'
  ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      //Views Cliente
      .when('/cliente', {templateUrl: 'views/cliente/cliente.html', controller: 'ClienteCtrl'})
      .when('/cliente/new', {templateUrl: 'views/cliente/create.html', controller: 'ClienteCtrl'})
      .when('/cliente/update/:ClienteID', {templateUrl: 'views/cliente/editar.html', controller: 'ClienteCtrl'})
      //Default
      .otherwise({
        redirectTo: '/'
      });
  });
  
app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);