'use strict';
angular.module('graduatesApp').factory('authInterceptorService', ['$q', 'Session', function ($q, Session, Utils) {

	var authInterceptorServiceFactory = {};

	var _request = function (config) {

		config.headers = config.headers || {};

		if (Session.isLogged()) {
			config.headers.Authorization = 'JWT ' + Session.getToken();
		}

		return config;
	}

	var _responseError = function (rejection) {
		if (rejection.status === 401) {
			Utils.toast("Inicia sesión en la aplicación antes de poder crear una tarea.", true)
			Session.delete()
			$location.path('/');
		}
		return $q.reject(rejection);
	}

	authInterceptorServiceFactory.request = _request;
	authInterceptorServiceFactory.responseError = _responseError;
	
	return authInterceptorServiceFactory;
}]);