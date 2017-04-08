(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('providerList', function() {
        return {
            restrict: 'A',
            scope: {
                providerData:"=providerData"
            },
            controller: ['$scope', 'DataService', function ($scope) {
                $scope.addProvider = function(){
                    console.log("submitting");
                };
            }],
            template:
                // I would normally have an external template file here, errors without webserver
                '<h1>Provider List</h1>'+
                '<div class="providerList">'+
                    '<div class="listHolder">'+
                        '<div class="listItem" ng-repeat="provider in providerData">' +
                            '<div class="providerWrap" ng-class-even="\'even\'">'+
                                '<input type="checkbox">'+
                                '<span class="providerName">{{provider.last_name}}, {{provider.first_name}}</span>'+
                                '<span class="providerSpecialty">{{provider.specialty}}</span>'+
                                '<span class="providerEmail">{{provider.email_address}}</span>'+
                                '<span class="providerPractice">{{provider.practice_name}}</span>'+
                                '<span class="clearFloat"></span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
        };
    })

}());

