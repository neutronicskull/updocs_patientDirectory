'use strict';

describe("dataService Factory", function() {
    var $scope;
    var dataService;
    var deferred;
    beforeEach(module("app"));
    beforeEach(inject(function(_$q_, $injector, _$rootScope_) {
        deferred = _$q_.defer();
        dataService = $injector.get('DataService');
        $scope = _$rootScope_.$new();
        dataService.data = [];
    }));

    it("Should be an object", function() {
        expect(dataService).toBeDefined();
    });

    it('should get provider data', function () {
        var promise = dataService.get("providerdata");

        promise.then(function(result){
            expect(result.error).toEqual(null);
        });

        $scope.$apply();
    });

    it('should fail to get provider data', function () {
        var promise = dataService.get("whatever");

        var testFunction = function(result){
            expect(result.error).toEqual(jasmine.objectContaining({
                message: "could not locate data"
            }));
        };

        promise.then(testFunction,testFunction);

        $scope.$apply();
    });

    it('should add record to data', function () {
        var promise = dataService.add({"test":"test"});

        var testFunction = function(result){
            expect(result.data[0]).toEqual(jasmine.objectContaining({
                test: "test"
            }));
        };

        promise.then(testFunction,testFunction);

        $scope.$apply();
    });

    it('should fail to add record to data', function () {
        var promise = dataService.add("whatever");

        var testFunction = function(result){
            expect(result.error).toEqual(jasmine.objectContaining({
                message: "error adding record"
            }));
        };

        promise.then(testFunction,testFunction);

        $scope.$apply();
    });

    it('should remove record from data', function () {
        dataService.data = [{"test":"test"}];
        var promise = dataService.remove({"test":"test"});

        var testFunction = function(result){
            expect(result.data.length).toEqual(0);
        };

        promise.then(testFunction,testFunction);

        $scope.$apply();
    });

    it('should fail remove record from data', function () {
        dataService.data = [{"test":"test"}];
        var promise = dataService.remove("whatever");

        var testFunction = function(result){
            expect(result.error).toEqual(jasmine.objectContaining({
                message: "error deleting record"
            }));
        };

        promise.then(testFunction,testFunction);

        $scope.$apply();
    });


});