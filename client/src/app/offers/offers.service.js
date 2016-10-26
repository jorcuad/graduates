'use strict';

angular.module('graduatesApp').service('Offers', function ($http) {
	$http.defaults.useXDomain = true;
	var offersEndpoint = 'http://localhost:8000/offers'
	var searchEndpoint = 'http://localhost:8000/offersearch/?'
	var categoriesEndpoint = 'http://localhost:8000/categories/'


	this.get = function () {
		return $http.get(offersEndpoint)
					.then(function(result) {
						return result.data;
					});
	}

	this.search = function (filters) {
		return $http.get(searchEndpoint+filters)
					.then(function(result) {
						return result.data;
					});
	}

	this.getCategories = function () {
		return $http.get(categoriesEndpoint)
					.then(function(result) {
						return result.data;
					});
	}
});
