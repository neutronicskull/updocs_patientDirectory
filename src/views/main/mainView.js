(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('MainController', ['$scope', 'DataService', function ($scope, DataService) {
        // controller for main view
        var vm = this;

        vm.directoryData = {};
        DataService.get("providerData").then(function(response) {
            vm.directoryData = response.data;
        }, function(response) {
            console.log("data load faile::"+response.error.message);
        });

    }]);

}());