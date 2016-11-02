'use strict';

angular.module('graduatesApp').service('OfferDetailService', function ($http, $route) {
	$http.defaults.useXDomain = true;
	var offersReadEndpoint = 'http://localhost:8000/offers_list/'
	var offersEditEndpoint = 'http://localhost:8000/offers_edit/'
	var favoritesEditEndpoint = 'http://localhost:8000/favs_edit/'

	this.get = function (id) {
		return $http.get(offersReadEndpoint+id+"/")
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

	this.addFavorite = function (userId,offerId) {
		return $http.get(favoritesEditEndpoint + userId + "/" + offerId + "/")
			.then(function(result) {
				$route.reload();
				return result;
			}, function (result) {
				$route.reload();
				return result;
			});
	}

	this.deleteFavorite = function (userId,offerId) {
		return $http.delete(favoritesEditEndpoint + userId + "/" + offerId + "/")
			.then(function(result) {
				$route.reload();
				return result;
			}, function (result) {
				$route.reload();
				return result;
			});
	}
	this.deleteOffer = function (id) {
		return $http.delete(offersEditEndpoint+id+"/")
			.then(function(result) {
				return result;
			}, function (result) {
				return result;
			});
		}
 });
