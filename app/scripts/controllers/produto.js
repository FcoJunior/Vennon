'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:ProdutoCtrl
 * @description
 * # ProdutoCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('ProdutoCtrl',['$scope', '$location', '$routeParams', 'baseFactory', 'messageFactory', 
  function ($scope, $location, $routeParams, baseFactory, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if($location.path() === '/produto'){
      //Lista os funcionários
      baseFactory.show('produto').success(function (data) {
        $scope.AllProduto = data;
      });  
    }
    
    if($location.path() === '/produto/new'){
        baseFactory.show('fornecedor').success(function(data){
          $scope.fornecedorList = data;   
        });
      };
      
    if($location.path() === '/produto/update/' + $routeParams.produtoID){
      //Lista o funcionário para atualizar
      getProdutoById($routeParams.produtoID);
      baseFactory.show('fornecedor').success(function(data){
        $scope.fornecedorList = data;   
      });
    };
    
    if($location.path() === '/relatorio_produto'){
      baseFactory.show('fornecedor').success(function(data){
        $scope.fornecedores = data;
      });
    };
    
    $scope.filtrar = function(id){
      if(id === undefined){
        var uri = "relatorioproduto";
      }else{
        uri = "relatorioproduto/" + id.FornecedorID;
      };
      console.log(id, uri);
      baseFactory.show(uri).success(function(data){
        $scope.produtos = data;
      });
    };
    
    //Cria um novo produto
    $scope.send = function(object){
      var entity = createJson(object);
      
      //Função para enviar dados para o back-end
      baseFactory.create('produto', entity)
      .success(function(data, status){
          messageFactory.newMessage(status, '/produto');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/produto');
      });
    };
    
    //Busca um produto pelo ID
    $scope.produtoDetail = function (id) {
      getProdutoById(id);
    };
    
    //Atualiza o produto
    $scope.produtoUpdate = function(object){
      var entity = createJson(object);
      entity.ProdutoID = object.ProdutoID;
      
      baseFactory.update('produto/' + entity.ProdutoID, entity)
      .success(function(data, status){
        messageFactory.newMessage(status, '/produto');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/produto');
      });
    };
    
    //Exclui o produto
    $scope.delete = function(id, row){
      messageFactory.confirmMessage('/produto', exclude(id, row));
    };
    
    function exclude(id, row) {
      baseFactory.destroy('produto/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/produto');
        if(status === 200){
          $scope.AllProduto.splice(row, 1);
        };
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/produto');
      });
    }
    
    //Serializa Json
    function createJson(object){
      var json = {};
      json.nome = object.nome;
      json.EAN = object.EAN;
      json.fornecedor = object.fornecedor;
      json.preco = object.preco;
      json.desconto = object.desconto;
      
      return json;
    };
    
    //Pega o produto pelo ID
    function getProdutoById(id){
      baseFactory.show('produto/' + id).success(function(data){
        $scope.produto = data;
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/produto');
      });
    };
    
  }]);
