'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:ClienteCtrl
 * @description
 * # ClienteCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('ClienteCtrl',['$scope', '$location', '$routeParams', 'baseFactory', 'messageFactory', 
  function ($scope, $location, $routeParams, baseFactory, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if($location.path() === '/cliente'){
      //Lista os clientes
      baseFactory.show('cliente').success(function (data) {
        $scope.AllClient = data;
      });  
    }
    
    if($location.path() === '/cliente/update/' + $routeParams.clienteID){
      //Lista o cliente para atualizar
      getClientById($routeParams.clienteID);
    };
    
    //Cria um novo cliente
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
      .success(function(data, status){
          messageFactory.newMessage(status, '/cliente');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/cliente');
      });
    };
    
    //Busca um cliente pelo ID
    $scope.clientDetail = function (id) {
      getClientById(id);
    };
    
    //Atualiza o cliente
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
      
      baseFactory.update('cliente/' + entity.ClienteID, entity)
      .success(function(data, status){
        messageFactory.newMessage(status, '/cliente');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/cliente');
      });
    };
    
    //Exclui o cliente
    $scope.delete = function(id, row){
      messageFactory.confirmMessage('/cliente', exclude(id, row));
    };
    
    function exclude(id, row) {
      baseFactory.destroy('cliente/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/cliente');
        if(status === 200){
          $scope.AllClient.splice(row, 1);
        };
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/cliente');
      });
    }
    
    function getClientById(id){
      baseFactory.show('cliente/' + id).success(function(data){
        $scope.cliente = data;
        $scope.cliente.endereco = data.endereco[0];
        $scope.cliente.contato = data.contato[0];
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/cliente');
      });;
    }
  }]);
