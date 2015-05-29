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
      //Função para enviar dados para o back-end
      baseFactory.create('cliente', entity)
      .success(function(){
        
      })
      .error(function(){
        alert("erro");
      });
    };
    
    $scope.getClientById = function (entity) {
      console.log(entity);
      baseFactory.show('cliente/' + entity).success(function(data){
        $scope.clientUpdate = data;
        console.log(data);
      });
    };
    
    $scope.update = function (cliente) {
      baseFactory.update('cliente/' + cliente.ClienteID, cliente);
    };
    
    $scope.delete = function(id){
      baseFactory.destroy('cliente/' + id)
      .success(function(){
        alert("Cliente excluido com sucesso!!");
      });
    };
  }]);
