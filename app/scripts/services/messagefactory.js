'use strict';

/**
 * @ngdoc service
 * @name vennonApp.messageFactory
 * @description
 * # messageFactory
 * Factory in the vennonApp.
 */
angular.module('vennonApp')
  .factory('messageFactory',['SweetAlert', '$location', function (SweetAlert, $location) {
    // Service logic
    // ...
  
    function newMessage(statusCode, path) {
      switch(statusCode.toString()){
        case "200":
          return successMessage(path);
          break;
        case "400":
          return badRequestMessage(path);
          break;
        case "404":
          return notFoundMessage(path);
          break;
        case "409":
          return conflictMessage(path);
          break;
        case "501":
          return notImplementedMessage(path);
          break;           
      }
    };
    
    //200
    function successMessage(path){
      SweetAlert
        .swal({
           title: "Operação realizada com sucesso!!",
           type: "success",
           closeOnConfirm: true 
          }, function(){
            $location.path(path);
         });
    };
    
    //400
    function badRequestMessage(path){
      SweetAlert
        .swal({
           title: "Ops, isso não era pra ter acontecido! :/",
           type: "error",
           confirmButtonColor: "#DD6B55",
           closeOnConfirm: true 
          }, function(){
            $location.path(path);
         });
    }
    
    //404
    function notFoundMessage(path){
      SweetAlert
        .swal({
           title: path.charAt(1).toUpperCase() + path.slice(2) + " não existe!",
           type: "error",
           confirmButtonColor: "#DD6B55",
           closeOnConfirm: true 
          }, function(){
            $location.path(path);
         });
    };
    
    //409
    function conflictMessage(path){
      SweetAlert
        .swal({
           title: path.charAt(1).toUpperCase() + path.slice(2) + " já cadastrado!",
           type: "error",
           confirmButtonColor: "#DD6B55",
           closeOnConfirm: true 
          }, function(){
            $location.path(path);
         });
    }
    
    //501
    function notImplementedMessage(path){
      SweetAlert
        .swal({
           title: path.charAt(1).toUpperCase() + path.slice(2) + " não pode ser excluido(a)!",
           type: "error",
           confirmButtonColor: "#DD6B55",
           closeOnConfirm: true 
          });
    }
    
    
    //Alert para confirmar exclusão
    function confirmMessage(path, action){
      SweetAlert.swal({
         title: "Está certo disso?!",
         text: "Tem certeza que deseja excluir este " + path.charAt(1).toUpperCase() + path.slice(2) + "?",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Sim, excluir",
         closeOnConfirm: true}, 
      function(){ 
         action;
      });
    };

    // Public API here
    return {
      newMessage: newMessage,
      confirmMessage: confirmMessage
    };
  }]);
