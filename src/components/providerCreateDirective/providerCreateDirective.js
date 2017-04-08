(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('providerCreate', function() {
        return {
            restrict: 'A',
            scope: {},
            controller: ['$scope', 'DataService', function ($scope, DataService) {
                var templateUser = {
                    "first_name":"",
                    "last_name":"",
                    "email_address":"",
                    "specialty":"",
                    "practice_name":""
                };
                $scope.newUser = angular.copy(templateUser);
                $scope.addProvider = function(){
                    DataService.add($scope.newUser).then(function(){
                        //success
                        $scope.newUser = angular.copy(templateUser);
                        $scope.providerCreate.$setPristine();
                    },function(){
                        //fail
                    });
                };
            }],
            template:
                // I would normally have an external template file here, errors without webserver
                '<h2>Create Provider</h2>'+
                '<div class="providerCreate">'+
                    '<form name="providerCreate" ng-submit="addProvider()">'+
                        '<label><span>Last Name*: </span><input type="text" name="lastName" ng-model="newUser.last_name" required /></label>'+
                        '<label><span>First Name*: </span><input type="text" name="firstName" ng-model="newUser.first_name" required /></label>'+
                        '<label><span>Email Address*: </span><input type="text" name="email" ng-model="newUser.email_address" required /></label>'+
                        '<label><span>Specialty: </span><input type="text" ng-model="newUser.specialty" /></label>'+
                        '<label><span>Practice Name: </span><input type="text" ng-model="newUser.practice_name" /></label>'+
                        '<span class="error" ng-show="providerCreate.$submitted && (providerCreate.lastName.$error.required || providerCreate.firstName.$error.required || providerCreate.email.$error.required)">Please Fill in the required fields.</span><br>'+
                        '<button>Submit</button>'+
                    '</form>'+
                '</div>'
        };
    })

}());

