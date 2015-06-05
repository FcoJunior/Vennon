'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:VendaCtrl
 * @description
 * # VendaCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('VendaCtrl',['$scope', '$location', '$routeParams', 'baseFactory', 'messageFactory', 
  function ($scope, $location, $routeParams, baseFactory, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if($location.path() === '/venda'){
      //Lista as vendas
      baseFactory.show('venda').success(function (data) {
        $scope.AllVenda = data;
      });  
    }
    
    if($location.path() === '/venda/new'){
        baseFactory.show('/vendedor').success(function(data){
          $scope.vendedorList = data;   
        });
        
        baseFactory.show('/cliente').success(function(data){
          $scope.clienteList = data;   
        });
      };
      
    if($location.path() === '/venda/update/' + $routeParams.vendaID){
      //Lista a venda para atualizar
      getVendaById($routeParams.vendaID);
      baseFactory.show('/vendedor').success(function(data){
        $scope.vendedorList = data;   
      });
    };
    
    //Cria uma nova venda
    $scope.send = function(object){
      var entity = createJson(object);
      
      //Função para enviar dados para o back-end
      baseFactory.create('venda', entity)
      .success(function(data, status){
          messageFactory.newMessage(status, '/venda');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/venda');
      });
    };
    
    //Atualiza a venda
    $scope.vendaUpdate = function(object){
      var entity = createJson(object);
      entity.VendaID = object.VendaID;
      
      baseFactory.update('venda/' + entity.VendaID, entity)
      .success(function(data, status){
        messageFactory.newMessage(status, '/venda');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/venda');
      });
    };
    
    //Cancela a venda
    $scope.vendaCancel = function(object){
      var entity = {};
      entity.VendaID = object.VendaID;
      entity.status = false;
      
      baseFactory.update('venda/' + entity.VendaID, entity)
      .success(function(data, status){
        messageFactory.newMessage(status, '/venda');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/venda');
      });
    };
    
    //Cancelar Venda
    $scope.cancel = function(id){
      baseFactory.update('cancelarvenda/' + id).success(function(data, status){
        messageFactory.newMessage(status, '/venda');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/venda');
      });
    };
    
    //Exclui a venda
    $scope.delete = function(id, row){
      messageFactory.confirmMessage('/venda', exclude(id, row));
    };
    
    function exclude(id, row) {
      baseFactory.destroy('venda/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/venda');
        if(status === 200){
          $scope.AllVenda.splice(row, 1);
        };
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/venda');
      });
    }
    
    //Busca uma venda pelo ID
    $scope.vendaDetail = function (id) {
      getVendaById(id);
    };
    
    //Serializa Json
    function createJson(object){
      var json = {};
      json.vendedor = object.vendedor;
      json.cliente = object.cliente;
      return json;
    };
    
    //Pega o produto pelo ID
    function getVendaById(id){
      baseFactory.show('venda/' + id).success(function(data){
        $scope.venda = data;
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/venda');
      });
    };
    
  }]);
