'use strict';

angular.module('graduatesApp').service('OfferDetailService', function ($http) {
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers_list/';
	var offersEditEndpoint = 'http://localhost:8000/offers_edit/'

	this.get = function (id) {
		return $http.get(offersEndpoint+id)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}
	this.changeStateOffer = function (offer) {
		var json={};
		angular.copy(offer,json);
		json.user=offer.user.id;
		return $http.put(offersEditEndpoint + offer.id+ '/',json)
					.then(function(result) {
						return result.data;
					});
	}

});