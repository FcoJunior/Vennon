'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:ClienteupdateCtrl
 * @description
 * # ClienteupdateCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('ClienteUpdateCtrl',['$scope', '$routeParams', 'baseFactory', '$location', function ($scope, $routeParams, baseFactory, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var clientID = $routeParams.clienteID;
    baseFactory.show('cliente/' + clientID).success(function(data){
        $scope.cliente = data;
        $scope.cliente.endereco = data.endereco[0];
        $scope.cliente.contato = data.contato[0];
        console.log(data);
      });
      
    $scope.clientUpdate = function(cliente){
      
      var entity = {};
      entity.ClienteID = cliente.ClienteID;
      entity.nome = cliente.nome;
      entity.CPF = cliente.CPF;
      entity.contato = [];
      cliente.contato.ContatoID = $scope.cliente.contato.ContatoID;
      entity.contato.push(cliente.contato);
      entity.endereco = [];
      cliente.endereco.EnderecoID = $scope.cliente.endereco.EnderecoID;
      entity.endereco.push(cliente.endereco);
      
      console.log(entity);
      
      baseFactory.update('cliente/' + entity.ClienteID, entity)
      .success(function(){
        alert("Cliente alterado com sucesso!!");
        $location.path('/cliente');
      })
      .error(function(){
        alert("erro");
      });
    };  
  
  }]);
