'use strict';

describe('Controller: ClienteCtrl', function () {

  // load the controller's module
  beforeEach(module('vennonApp'));

  var ClienteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClienteCtrl = $controller('ClienteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
