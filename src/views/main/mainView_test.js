'use strict';

describe("main view controller", function() {
    var $rootScope;
    var $controller;
    var $scope;
    var controller;
    beforeEach(module("app"));
    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
    }));
    beforeEach(inject(function($controller) {
        controller = $controller('MainController', {
            $scope: $scope
        });
    }));

    it("Should be defined", function() {
        expect(controller).toBeDefined();
    });

});