'use strict';

angular.module('graduatesApp').service('Offers', function ($http) {
	//var topicsEndpoint = 'topics.json';
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers'

	this.get = function () {
		return $http.get(offersEndpoint)
					.then(function(result) {
						return result.data;
					});
		/*return [{"name":"Pablo", "description":"Cambio partido de futbol por cañas"},
				{"name":"Kiko", "description":"cambio motillo por motor"},
				{"name":"Jaime", "description":"arreglo ordenador a cambio de tu presencia"},
				{"name":"Heineken", "description":"Regalo cerveza, está caducada"}]*/
	}

});