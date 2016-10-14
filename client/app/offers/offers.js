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
	/*$scope.offers = $http.get('http://192.168.1.45:8001/offers')
					.then(function(result) {
						console.log("-----------------------------------")
						console.log(result)
						return result.data.results;
					});*/
	/*this.getCourse = function() {
		return $http({method:'GET',url:'http://192.168.1.45:8001/offers'});
	}
	console.log("-----------------------------------")
	console.log(this.getCourse)*/
	$scope.offers = [{"name":"Pablo", "description":"Cambio partido de futbol por cañas"},
					{"name":"Kiko", "description":"cambio motillo por motor"},
					{"name":"Jaime", "description":"arreglo ordenador a cambio de tu presencia"},
					{"name":"Heineken", "description":"Regalo cerveza, está caducada"}]

}]);