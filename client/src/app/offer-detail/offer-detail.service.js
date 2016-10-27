'use strict';

angular.module('graduatesApp').service('OfferDetailService', function ($http) {
	$http.defaults.useXDomain = true;
	var offersReadEndpoint = 'http://localhost:8000/offers_list/'
 	var offersEditEndpoint = 'http://localhost:8000/offers_edit/'
	this.get = function (id) {
		return $http.get(offersReadEndpoint+id+"/")
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

	this.deleteOffer = function (id) {
 		console.log(offersEditEndpoint+id)
 		return $http.delete(offersEditEndpoint+id+"/")
 					.then(function(result) {
 						return result;
 				}, function (result) {
 						return result;
 					});
 	}

 });
