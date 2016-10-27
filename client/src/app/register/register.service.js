'use strict';

angular.module('graduatesApp').service('RegisterService', function ($http) {
	$http.defaults.useXDomain = true;
	var registerEndpoint = 'http://localhost:8000/register'

	this.register = function (registerData) {
		return $http.post(registerEndpoint, registerData)
					.then(function(result) {
						return result;
					}, function (result) {
						return result;
					});
	}

});
