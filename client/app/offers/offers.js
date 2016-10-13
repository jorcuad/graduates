'use strict';

angular.module('myApp.offers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/offers', {
    templateUrl: 'offers/offers.html',
    controller: 'OffersCtrl'
  });
}])

.controller('OffersCtrl', ['$scope','$http', function ($scope, $http) {
	
	var search = ""
	/*var offers = $http.get('http://localhost:8000/offers')
					.then(function(result) {
						return result.data.results;
					});*/
	$scope.offers = [{"name":"uno", "description":"uno"},{"name":"dos", "description":"dos"},{"name":"tres", "description":"tres"},{"name":"cuatro", "description":"cuatro"}]

}]);