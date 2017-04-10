(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('providerList', function() {
        return {
            restrict: 'A',
            scope: {
                providerData:"=providerData"
            },
            controller: ['$scope', 'DataService', '$timeout', function ($scope, DataService, $timeout) {
                var selectionList = [];

                $scope.filterString = '';

                //must happen after digest
                $timeout(function(){
                    configureSelect();
                },0);

                $scope.removeProvider = function(){
                    var listToRemove = [];
                    for (var i = 0, j = selectionList.length; i < j; i++) {
                        for (var k = 0, l = $scope.providerData.length; k < l; k++) {
                            if (selectionList[i] == $scope.providerData[k].$$hashKey){
                                listToRemove.push($scope.providerData[k]);
                            }
                        }
                    }
                    DataService.remove(listToRemove).then(function(){
                        selectionList = [];
                    })

                };

                $scope.toggleCheckbox = function(provider){
                    var idx = selectionList.indexOf(provider.$$hashKey);
                    if (idx > -1) {
                        selectionList.splice(idx, 1);
                    }
                    else {
                        selectionList.push(provider.$$hashKey);
                    }
                };

                function configureSelect(){
                    $scope.selectedOrder = '';
                    $scope.ascendingOrder = false;
                    $scope.selectData = {};
                    for (var key in $scope.providerData[0]){
                        var newValue = key.replace(/_/g, " ");
                        $scope.selectData[newValue] = key;
                    }
                }

            }],
            template:
                // I would normally have an external template file here, errors without webserver
                '<h1>Provider List</h1>'+
                '<div class="filterWrap">'+
                    '<label>Filter: <input ng-model="filterString" /></label>'+
                    '<select name="sortSelect" id="sortSelect" ng-model="selectedOrder" ng-click="selectClicked()">'+
                        '<option ng-value="\'\'">Sort By</option>'+
                        '<option ng-repeat="(key, value) in selectData" ng-value="value">{{key}}</option>'+
                    '</select>'+
                '</div>'+
                '<div class="providerList">'+
                    '<div class="listHolder">'+
                        '<div class="listItem" ng-repeat="provider in providerData | filter:filterString | orderBy: selectedOrder : ascendingOrder" {{ orderBy_expression | orderBy : expression : reverse : comparator}}>' +
                            '<div class="providerWrap" ng-class-even="\'even\'">'+
                                '<input type="checkbox" ng-click="toggleCheckbox(provider)">'+
                                '<span class="providerName">{{provider.last_name}}, {{provider.first_name}}</span>'+
                                '<span class="providerSpecialty">{{provider.specialty}}</span>'+
                                '<span class="providerEmail">{{provider.email_address}}</span>'+
                                '<span class="providerPractice">{{provider.practice_name}}</span>'+
                                '<span class="clearFloat"></span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<button ng-click="removeProvider()">remove</button>'
        };
    })

}());

