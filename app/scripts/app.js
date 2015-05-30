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
    'ui.utils.masks',
    'oitozero.ngSweetAlert'
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
      .when('/cliente/update/:clienteID', {templateUrl: 'views/cliente/editar.html', controller: 'ClienteCtrl'})
      
      //Views Cargo
      .when('/cargo', {templateUrl: 'views/cargo/cargo.html', controller: 'CargoCtrl'})
      .when('/cargo/new', {templateUrl: 'views/cargo/create.html', controller: 'CargoCtrl'})
      .when('/cargo/update/:cargoID', {templateUrl: 'views/cargo/editar.html', controller: 'CargoCtrl'})
      
      //Views Funcionario
      .when('/funcionario', {templateUrl: 'views/funcionario/funcionario.html', controller: 'FuncionarioCtrl'})
      .when('/funcionario/new', {templateUrl: 'views/funcionario/create.html', controller: 'FuncionarioCtrl'})
      .when('/funcionario/update/:funcionarioID', {templateUrl: 'views/funcionario/editar.html', controller: 'FuncionarioCtrl'})
      
      //Views Fornecedor
      .when('/fornecedor', {templateUrl: 'views/fornecedor/fornecedor.html', controller: 'FornecedorCtrl'})
      .when('/fornecedor/new', {templateUrl: 'views/fornecedor/create.html', controller: 'FornecedorCtrl'})
      .when('/fornecedor/update/:fornecedorID', {templateUrl: 'views/fornecedor/editar.html', controller: 'FornecedorCtrl'})
      
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