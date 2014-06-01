'use strict';

//Articles service used for services REST endpoint
angular.module('mean').factory('Services', ['$resource',
	function($resource) {
		return $resource('services/:serviceId', {
			serviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
