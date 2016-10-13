'use strict';

angular.module('myApp.offers').service('Offers', function ($http) {
	//var topicsEndpoint = 'topics.json';
	var offersEndpoint = 'http://localhost:8000/offers'

	this.get = function () {
		return $http.get(offersEndpoint)
					.then(function(result) {
						return result.data.results;
					});
	}

});