'use strict';

function routeConfig ($routeProvider) {
	$routeProvider
		.when('/', {
			template : "<offers></offers>"
		})
		.when('/new-offer', {
			templateUrl : "./app/views/new-offer.html"
		})
		.when('/register', {
			templateUrl : "./app/views/register.html"
		})
		.when('/detail/:orderId', {
			template : "<offer-detail></offer-detail>"
		})
		.when('/edit/:orderId', {
			templateUrl : "./app/views/edit-offer.html"
		})
		.when('/404', {
			template: '<h1 class="text-center text-warning">404</h1>'
		})
		.otherwise({
			redirectTo: '/404'
		});
}

angular.module('graduatesApp').config(routeConfig);
