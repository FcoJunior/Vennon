'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:ClienteCtrl
 * @description
 * # ClienteCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('ClienteCtrl',['$scope', '$http', 'baseFactory', function ($scope, $http, baseFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    baseFactory.show('cliente').success(function (data) {
      $scope.AllClient = data;
    });

    $scope.send = function(cliente){
      var entity = {};
      entity.nome = cliente.nome;
      entity.CPF = cliente.CPF;
      entity.contato = [];
      entity.contato.push(cliente.contato);
      entity.endereco = [];
      entity.endereco.push(cliente.endereco);
      
      //$http.post('http://localhost:16979/api/cliente', entity).error(function(){alert("error");});
      
      
      baseFactory.create('cliente', entity)
      .success(function(){
        
      })
      .error(function(){
        alert("erro");
      });
    };
  }]);
