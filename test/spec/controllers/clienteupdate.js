'use strict';

describe('Controller: ClienteupdateCtrl', function () {

  // load the controller's module
  beforeEach(module('vennonApp'));

  var ClienteupdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClienteupdateCtrl = $controller('ClienteupdateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
