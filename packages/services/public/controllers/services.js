'use strict';

angular.module('mean.services').controller('ServicesController', ['$scope', 'Global',
    function($scope, Global, Services) {
        $scope.global = Global;
        $scope.package = {
            name: 'services'
        };
    }
]);
