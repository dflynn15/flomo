'use strict';

angular.module('mean.services').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('services example page', {
            url: '/services/example',
            templateUrl: 'services/views/index.html'
        });
    }
]);
