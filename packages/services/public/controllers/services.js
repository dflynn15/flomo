'use strict';

angular.module('mean.services').controller('ServicesController', ['$scope', '$stateParams', '$location', 'Global', 'Services',
    function($scope, $stateParams, $location, Global, Services) {
        $scope.global = Global;
        $scope.package = {
            name: 'services'
        };

		$scope.hasAuthorization = function(service) {
            if (!service || !service.user) return false;
            return $scope.global.isAdmin || service.user._id === $scope.global.user._id;
        };

		$scope.remove = function(service) {
            if (service) {
                service.$remove();

                for (var i in $scope.Services) {
                    if ($scope.Services[i] === service) {
                        $scope.Services.splice(i, 1);
                    }
                }
            } else {
                $scope.service.$remove(function(response) {
                    $location.path('Services');
                });
            }
        };

        $scope.update = function() {
            var service = $scope.service;
            if (!service.updated) {
                service.updated = [];
            }
            service.updated.push(new Date().getTime());

            service.$update(function() {
                $location.path('Services/' + service._id);
            });
        };

		$scope.find = function() {
            Services.query(function(Services) {
                $scope.Services = Services;
            });
        };

        $scope.findOne = function() {
            Services.get({
                serviceId: $stateParams.serviceId
            }, function(service) {
                $scope.service = service;
            });
        };


		$scope.create = function() {
            var service = new Services({
                title: this.title,
                content: this.content
            });
            service.$save(function(response) {
                $location.path('Services/' + response._id);
            });

            this.title = '';
            this.content = '';
        };
    }
]);
