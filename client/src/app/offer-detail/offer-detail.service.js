'use strict';

angular.module('graduatesApp').service('OfferDetailService', function ($http) {
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers_list/'

	this.get = function (id) {
		return $http.get(offersEndpoint+id+"/")
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

});
