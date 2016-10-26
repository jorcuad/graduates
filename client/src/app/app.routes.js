'use strict';

function routeConfig ($routeProvider) {
	$routeProvider
		.when('/', {
			template : "<offers></offers>"
		})
		.when('/new-offer', {
			templateUrl : "./app/views/new-offer.html",
			resolve: {
				factory: checkRouting
			}
		})
		.when('/register', {
			templateUrl : "./app/views/register.html"
		})
		.when('/detail/:orderId', {
			template : "<offer-detail></offer-detail>"
		})
		.when('/404', {
			template: '<h1 class="text-center text-warning">404</h1>'
		})
		.otherwise({
			redirectTo: '/404'
		});
}

var checkRouting= function ($q, $rootScope, $location, Session, Utils) {
	if (Session.isLogged()) {
		return true;
	} else {
		Utils.toast("Inicia sesión en la aplicación antes de poder crear una tarea.", true)
		$location.path("/");
			
		return false;
	}
};

angular.module('graduatesApp').config(routeConfig);