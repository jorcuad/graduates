'use strict';

angular.module('graduatesApp').service('Offers', function ($http) {
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers_list/'
	var searchEndpoint = 'http://localhost:8000/offersearch/?'
	var categoriesEndpoint = 'http://localhost:8000/categories/'
	var favoritesListEndpoint = 'http://localhost:8000/favs_user/'


	this.get = function () {
		return $http.get(offersEndpoint)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

	this.search = function (filters) {
		return $http.get(searchEndpoint+filters)
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

	this.getFavorites = function (user_id) {
		return $http.get(favoritesListEndpoint + user_id +"/")
					.then(function(result) {
						return result.data.favorites;
					});
	}

});
