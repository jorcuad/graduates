'use strict';

angular.module('graduatesApp').service('OfferDetailService', function ($http) {
	//var topicsEndpoint = 'topics.json';
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers/'

	this.get = function (id) {
		return $http.get(offersEndpoint+id)
					.then(function(result) {
						return result.data;
					});
	}

});