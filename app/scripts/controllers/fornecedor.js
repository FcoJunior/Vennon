'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:FornecedorCtrl
 * @description
 * # FornecedorCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('FornecedorCtrl',['$scope', '$location', '$routeParams', 'baseFactory', 'messageFactory', 
  function ($scope, $location, $routeParams, baseFactory, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if($location.path() === '/fornecedor'){
      //Lista os fornecedores
      baseFactory.show('fornecedor').success(function (data) {
        $scope.AllFornecedor = data;
      });  
    }
    
    if($location.path() === '/fornecedor/update/' + $routeParams.fornecedorID){
      //Lista o fornecedor para atualizar
      getFornecedorById($routeParams.fornecedorID);
    };
    
    //Cria um novo fornecedor
    $scope.send = function(fornecedor){
      var entity = createJson(fornecedor);
      //Função para enviar dados para o back-end
      baseFactory.create('fornecedor', entity)
      .success(function(data, status){
          messageFactory.newMessage(status, '/fornecedor');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/fornecedor');
      });
    };
    
    //Busca um cliente pelo ID
    $scope.fornecedorDetail = function (id) {
      getFornecedorById(id);
    };
    
    //Atualiza o cliente
    $scope.fornecedorUpdate = function(fornecedor){
      fornecedor.contato.ContatoID = $scope.fornecedor.contato.ContatoID;
      fornecedor.endereco.EnderecoID = $scope.fornecedor.endereco.EnderecoID;
      var entity = createJson(fornecedor);
      entity.FornecedorID = fornecedor.FornecedorID;
      
      baseFactory.update('fornecedor/' + entity.FornecedorID, entity)
      .success(function(data, status){
        messageFactory.newMessage(status, '/fornecedor');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/fornecedor');
      });
    };
    
    //Exclui o cliente
    $scope.delete = function(id, row){
      messageFactory.confirmMessage('/fornecedor', exclude(id, row));
    };
    
    function exclude(id, row) {
      baseFactory.destroy('fornecedor/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/fornecedor');
        if(status === 200){
          $scope.AllFornecedor.splice(row, 1);
        };
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/fornecedor');
      });
    }
    
    function getFornecedorById(id){
      baseFactory.show('fornecedor/' + id).success(function(data){
        $scope.fornecedor = data;
        $scope.fornecedor.endereco = data.endereco[0];
        $scope.fornecedor.contato = data.contato[0];
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/fornecedor');
      });;
    }
    
    
    //Serializa Json
    function createJson(object){
      var json = {};
      json.razaoSocial = object.razaoSocial;
      json.CNPJ = object.CNPJ;
      json.IE = object.IE;
      json.nomeFantasia = object.nomeFantasia;
      json.contato = [];
      json.contato.push(object.contato);
      json.endereco = [];
      json.endereco.push(object.endereco);

      return json;
    };
    
  }]);
