'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:NotaCtrl
 * @description
 * # NotaCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('NotaCtrl',['$scope', '$location', '$routeParams', 'baseFactory', 'messageFactory', 
  function ($scope, $location, $routeParams, baseFactory, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if($location.path() === '/nota'){
      //Lista as notas
      baseFactory.show('notafiscal').success(function (data) {
        $scope.AllNotaFiscal = data;
      });
    };
    
    if($location.path() === '/nota/new/' + $routeParams.vendaID){
      baseFactory.show('venda/' + $routeParams.vendaID).success(function(data){
        $scope.venda = data;
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/venda');
      });
      
      baseFactory.show('emissor').success(function(data){
        $scope.emissor = data;
      });
      
      baseFactory.show('produto').success(function(data){
        $scope.produto = data;
      });
      
      $scope.itens = [];
      $scope.total = 0.0;
    };
    
    //Adiciona produtos no array
    $scope.addItem = function (object){
      var entity = {};
      entity = object;
      $scope.itens.push(entity);
      $scope.total += object.total;
      $scope.item = {};
    };
      
    //Cria a nota
    $scope.send = function(object){
      var entity = createJson(object);
      console.log(entity);
      //Função para enviar dados para o back-end
      baseFactory.create('notafiscal', entity)
      .success(function(data, status){
          messageFactory.newMessage(status, '/nota');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/nota');
      });
    };
    
    //Busca um funcionário pelo ID
    $scope.notaDetail = function (id) {
      getNotaById(id);
    };
    
    //Cancelar nota
    $scope.cancelNf = function(id, row){
      messageFactory.confirmMessage('/notafiscal', cancel(id, row));
    };
    
    function cancel(id, row) {
      baseFactory.destroy('notafiscal/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/notafiscal');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/notafiscal');
      });
    };
    
    function createJson(object){
      var json = {};
      json.venda = $scope.venda;
      //emissor
      json.emissor = object.emissor;
      json.itens = $scope.itens;
      
      return json;
    }; 
    
    //Pega a nota pelo ID
    function getNotaById(id){
      baseFactory.show('notafiscal/' + id).success(function(data){
        $scope.nota = data;
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/nota');
      });
    };
    
  }]);
