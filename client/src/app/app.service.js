'use strict';

angular.module('graduatesApp').service('Session', function() {
	return {
		isLogged: false,
		username: ''
	};
});