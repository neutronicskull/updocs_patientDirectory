(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('MainController', ['$scope', 'DataService',function ($scope, DataService) {
        // controller for main view
        var vm = this;

        $scope.directoryData = {};
        DataService.get("providerData").then(function(response) {
            $scope.directoryData = response.data;
        }, function(response) {
            console.log("data load failed::"+response.error.message);
        });

    }]);

}());