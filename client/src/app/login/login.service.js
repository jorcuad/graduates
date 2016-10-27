'use strict';

angular.module('graduatesApp').service('LoginService', function ($http) {
	$http.defaults.useXDomain = true;
	var loginEndpoint = 'http://localhost:8000/login/'

	this.login = function (loginData) {
		return $http.post(loginEndpoint, loginData)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

});
