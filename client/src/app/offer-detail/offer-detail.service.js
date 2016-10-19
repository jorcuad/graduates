'use strict';

angular.module('graduatesApp').service('OfferDetailService', function ($http) {
	//var topicsEndpoint = 'topics.json';
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers/'

	this.get = function () {
		/*return $http.get(offersEndpoint)
					.then(function(result) {
						return result.data;
					});*/
		return {"name":"Pablo", "description":"Cambio partido de futbol por cañas"}
	}

});