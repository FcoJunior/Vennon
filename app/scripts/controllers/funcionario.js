'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:FuncionarioCtrl
 * @description
 * # FuncionarioCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('FuncionarioCtrl',['$scope', '$location', '$routeParams', 'baseFactory', 'messageFactory',
  function ($scope, $location, $routeParams, baseFactory, messageFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    if($location.path() === '/funcionario'){
      //Lista os funcionários
      baseFactory.show('funcionario').success(function (data) {
        $scope.AllFuncionario = data;
      });  
    }
    
    if($location.path() === '/funcionario/new'){
        baseFactory.show('/cargo').success(function(data){
          $scope.cargoList = data;   
        });
      };
      
    if($location.path() === '/funcionario/update/' + $routeParams.funcionarioID){
      //Lista o funcionário para atualizar
      getFuncionarioById($routeParams.funcionarioID);
      baseFactory.show('/cargo').success(function(data){
        $scope.cargoList = data;   
      });
    };
    
    //Cria um novo funcionário
    $scope.send = function(object){
      var entity = createJson(object);
      
      //Função para enviar dados para o back-end
      baseFactory.create('funcionario', entity)
      .success(function(data, status){
          messageFactory.newMessage(status, '/funcionario');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/funcionario');
      });
    };
    
    //Busca um funcionário pelo ID
    $scope.funcionarioDetail = function (id) {
      getFuncionarioById(id);
    };
    
    //Atualiza o funcionário
    $scope.funcionarioUpdate = function(object){
      object.contato.ContatoID = $scope.funcionario.contato.ContatoID;
      object.endereco.EnderecoID = $scope.funcionario.endereco.EnderecoID;
      var entity = createJson(object);
      entity.FuncionarioID = object.FuncionarioID;
      
      baseFactory.update('funcionario/' + entity.FuncionarioID, entity)
      .success(function(data, status){
        messageFactory.newMessage(status, '/funcionario');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/funcionario');
      });
    };
    
    //Exclui o funcionário
    $scope.delete = function(id, row){
      messageFactory.confirmMessage('/funcionario', exclude(id, row));
    };
    
    function exclude(id, row) {
      baseFactory.destroy('funcionario/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/funcionario');
        if(status === 200){
          $scope.AllFuncionario.splice(row, 1);
        };
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/funcionario');
      });
    }
    
    function getFuncionarioById(id){
      baseFactory.show('funcionario/' + id).success(function(data){
        $scope.funcionario = data;
        $scope.funcionario.endereco = data.endereco[0];
        $scope.funcionario.contato = data.contato[0];
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/funcionario');
      });;
    }
    
    //Serializa Json
    function createJson(object){
      var json = {};
      json.nome = object.nome;
      json.CPF = object.CPF;
      json.cargo = object.cargo;
      json.contato = [];
      json.contato.push(object.contato);
      json.endereco = [];
      json.endereco.push(object.endereco);

      return json;
    };
    
  }]);
