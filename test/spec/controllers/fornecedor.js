'use strict';

describe('Controller: FornecedorCtrl', function () {

  // load the controller's module
  beforeEach(module('vennonApp'));

  var FornecedorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FornecedorCtrl = $controller('FornecedorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
