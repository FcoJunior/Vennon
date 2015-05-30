'use strict';

/**
 * @ngdoc function
 * @name vennonApp.controller:CargoCtrl
 * @description
 * # CargoCtrl
 * Controller of the vennonApp
 */
angular.module('vennonApp')
  .controller('CargoCtrl',['$scope', 'baseFactory', '$location', 'messageFactory', '$routeParams', 
  function ($scope, baseFactory, $location, messageFactory, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    //Listar os cargos
    if($location.path() === '/cargo'){
      baseFactory.show('cargo').success(function (data) {
        $scope.AllCargo = data;
      });  
    };
    
    //Busca cargo pelo id
    if($location.path() === '/cargo/update/' + $routeParams.cargoID){
      var cargoID = $routeParams.cargoID;
      baseFactory.show('cargo/' + cargoID).success(function(data){
        $scope.cargo = data;
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/cargo');
      });  
    };
    
    //Cria um novo cargo
    $scope.send = function(cargo){
      var cargoEntity = cargo.cargo.toLowerCase();
      cargo.cargo = cargoEntity.charAt(0).toUpperCase() + cargoEntity.slice(1);
      baseFactory.create('cargo', cargo)
      .success(function(data, status){
          messageFactory.newMessage(status, '/cargo');
      })
      .error(function(data, status){
          messageFactory.newMessage(status, '/cargo');
      });
    };
    
    //Atualizar cargo
    $scope.cargoUpdate = function(cargo){
      var cargoEntity = cargo.cargo.toLowerCase();
      cargo.cargo = cargoEntity.charAt(0).toUpperCase() + cargoEntity.slice(1);
      
      baseFactory.update('cargo/' + cargo.CargoID, cargo)
      .success(function(data, status){
        messageFactory.newMessage(status, '/cargo');
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/cargo');
      });
    };
    
    //Excluir o cargo
    $scope.delete = function(id, row){
      messageFactory.confirmMessage('/cargo', exclude(id, row));
    };
    
    function exclude(id, row) {
      baseFactory.destroy('cargo/' + id)
      .success(function(data, status){
        messageFactory.newMessage(status, '/cargo');
        if(status === 200){
          $scope.AllCargo.splice(row, 1);
        };
      })
      .error(function(data, status){
        messageFactory.newMessage(status, '/cargo');
      });
    }
  }]);
