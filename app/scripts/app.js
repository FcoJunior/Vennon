'use strict';

/**
 * @ngdoc overview
 * @name vennonApp
 * @description
 * # vennonApp
 *
 * Main module of the application.
 */
angular
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
  ])
  .config(function ($routeProvider) {
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
      .when('/cliente/new', {templateUrl: 'views/cliente/form.html', controller: 'ClienteCtrl'})
      //Default
      .otherwise({
        redirectTo: '/'
      });
  });
