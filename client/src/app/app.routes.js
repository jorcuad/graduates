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

function authCheck($rootScope, Session) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
	  if (true) {
		if (next.access.isFree) {
			console.log("NO SE VAYA")
		} else {
			console.log("VAYASE")
		  //$location.path("/");
		}
	  }
	})
}

var checkRouting= function ($q, $rootScope, $location, Session) {
	if (Session.isLogged) {
		return true;
	} else {
		console.log("VAYASE")
		console.log(Session.isLogged)
		$location.path("/");
			
		return false;
	}
};

angular.module('graduatesApp').config(routeConfig);//.run(authCheck);