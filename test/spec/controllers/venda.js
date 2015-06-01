'use strict';

describe('Controller: VendaCtrl', function () {

  // load the controller's module
  beforeEach(module('vennonApp'));

  var VendaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VendaCtrl = $controller('VendaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
