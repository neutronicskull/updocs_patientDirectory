(function () {
    'use strict';

    var app = angular.module('app');

    var providerData = [
        {"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},
        {"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},
        {"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},
        {"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},
        {"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting’s Well Kids Pediatrics"},
        {"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}
    ];

    app.factory('DataService', ['$q', function($q) {
        var factory = {};

        factory.data = [];

        factory.get = function(location){
            var deferred = $q.defer();

            // would normally have an xhr here, loading local data instead
            if (location && location.toLowerCase() == "providerdata"){
                factory.data = providerData;
                deferred.resolve({ data:factory.data, error:null });
            } else {
                deferred.reject({ data:factory.data, error:{"message":"could not locate data"} });
            }

            return deferred.promise;
        };

        factory.add = function(data){
            var deferred = $q.defer();

            // would normally have an xhr here, loading local data instead
            if (data && typeof data === 'object'){
                factory.data.unshift(data);
                deferred.resolve({ data:factory.data, error:false });
            } else {
                deferred.reject({ data:factory.data, error:{"message":"error adding record"} });
            }

            return deferred.promise;
        };

        factory.remove = function(data){
            var deferred = $q.defer();

            // would normally have an xhr here, loading local data instead
            if (data && Array.isArray(data)){
                for (var i = data.length-1, j = 0; i >= j; i--) {
                    removeObjectFromArray(factory.data, data[i]);
                }
                deferred.resolve({ data:factory.data, error:false });
            } else if (data && typeof data === 'object'){
                removeObjectFromArray(factory.data, data);
                deferred.resolve({ data:factory.data, error:false });
            } else {
                deferred.reject({ data:factory.data, error:{"message":"error deleting record"} });
            }

            return deferred.promise;
        };

        function removeObjectFromArray(array, data){
            if (data && typeof data === 'object' && array && array.length > 0){
                for (var i = 0, j = array.length; i < j; i++) {
                    if (angular.equals(array[i], data)){
                        array.splice(i,1);
                    }
                }
            }
        }

        return factory;
    }]);

}());

