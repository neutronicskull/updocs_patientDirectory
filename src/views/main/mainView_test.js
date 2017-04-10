'use strict';

describe("main view controller", function() {
    var $rootScope;
    var $controller;
    var $scope;
    var controller;
    var dataServiceMock;
    beforeEach(module("app"));
    beforeEach(inject(function($injector, $controller, $q) {
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
        dataServiceMock = $injector.get('DataService');
        spyOn(dataServiceMock , 'get').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve({test:"test"});
            return deferred.promise;
        });
        controller = $controller('MainController', {
            $scope: $scope,
            DataService: dataServiceMock
        });
    }));

    it("Should be defined", function() {
        expect(controller).toBeDefined();
    });

    it("Should call get directory data", function() {
        expect(dataServiceMock.get).toHaveBeenCalled();
    });

});