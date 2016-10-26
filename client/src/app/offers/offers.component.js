'use strict';

function offersCtrl ($http, $scope, Offers, Utils, Session) {
	var vm = this;
	$scope.formData = {};

	vm.search = ""
	vm.categories = ""
	vm.category = ""

	vm.$onInit = function () {

		$scope.logged = Session.isLogged()

		if($scope.logged) {
			$scope.username = Session.getUser()
		}

		$scope.offerform = {}
		Offers.get().then(function (answer) {
			vm.offers = answer.data;
		}, function(answer) {
			Utils.toast(answer.status + " : Error al obtener las ofertas, recargue la página e intentelo de nuevo.")
		})
		Offers.getCategories().then(function (answer) {
			vm.categories = answer.data;
		}, function (answer) {
			Utils.toast(answer.status + " : Error al obtener las categorías, recargue la página e intentelo de nuevo.", true)
		})
	};

	vm.filter = function() {
		var query = ""
		if (vm.search !== "") {
			query = "search="+vm.search
		}
		if (vm.category !== "") {
			if ( query !== "") {
				query = query+"&"
			}
			query = query+"category="+vm.category
		}
		Offers.search(query).then(function (answer) {
			vm.offers = answer.data;
		}, function(answer) {
			Utils.toast(answer.status + " : Error al buscar ofertas, recargue la página e intentelo de nuevo.", true)
		})
	};
}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});
