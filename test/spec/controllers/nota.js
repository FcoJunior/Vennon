'use strict';

describe('Controller: NotaCtrl', function () {

  // load the controller's module
  beforeEach(module('vennonApp'));

  var NotaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotaCtrl = $controller('NotaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
