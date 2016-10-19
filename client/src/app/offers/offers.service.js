'use strict';

angular.module('graduatesApp').service('Offers', function ($http) {
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers'

	this.get = function () {
		return $http.get(offersEndpoint)
					.then(function(result) {
						return result.data;
					});
	}

});
