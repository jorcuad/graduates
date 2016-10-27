'use strict';

angular.module('graduatesApp').service('OfferForm', function ($http) {
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers/'
	var categoriesEndpoint = 'http://localhost:8000/categories/'


	this.get = function (id) {
		return $http.get(offersEndpoint+id)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

	this.getCategories = function () {
		return $http.get(categoriesEndpoint)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

	this.create = function (offerData) {
		return $http.post(offersEndpoint, offerData)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

	this.update = function (offerData) {
		return $http.put(offersEndpoint, offerData)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

});
