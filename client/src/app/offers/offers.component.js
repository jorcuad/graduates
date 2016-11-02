'use strict';

function offersCtrl ($http, $scope, Offers, Utils, Session) {

	var vm = this;
	$scope.formData = {};
	$scope.userlogged= {};

	vm.search = ""
	vm.categories = ""
	vm.category = ""

	vm.$onInit = function () {
		$scope.user = {}

		Offers.get().then(function (answer) {
			vm.myoffers = answer.data;
		}, function(answer) {
			Utils.toast(answer.status + " : Error al obtener las ofertas, recargue la página e intentelo de nuevo.")
		})
		Offers.getCategories().then(function (answer) {
			vm.categories = answer.data;
		}, function (answer) {
			Utils.toast(answer.status + " : Error al obtener las categorías, recargue la página e intentelo de nuevo.", true)
		})
		Offers.search("gt=today").then(function (answer) {
			vm.offers = answer.data;
		}, function(answer) {
			Utils.toast(answer.status + " : Error al buscar ofertas, recargue la página e intentelo de nuevo.", true)
		})

		$scope.offerform = {}
		$scope.logged = Session.isLogged()

		if(Session.isLogged()) {
			$scope.user = Session.getUser()
			Offers.getFavorites($scope.user.id).then(function (favorites) { vm.favorites = favorites; })
		}

	};

	vm.filter = function() {
		var query = ""
		if (vm.search !== "") {
			query = "search="+vm.search
		}
		if (vm.category !== "" && vm.category !== "Categoría") {
			if(vm.search !== "") {
				query = query+"&category="+vm.category
			} else {
				query = "category="+vm.category
			}
		}
		Offers.search(query).then(function (answer) {
			vm.offers = answer.data;
		}, function(answer) {
			Utils.toast(answer.status + " : Error al buscar ofertas, recargue la página e intentelo de nuevo.", true)
		})
	};
}

function DialogController($scope, $mdDialog) {

	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.getStateOffer = function (offer){
		$scope.offer = offer;
		return offer.active;
	};
	$scope.changeStateOffer = function (offer){
		$offer.active = !offer.active;
		OfferDetailService.changeStateOffer($scope.offer);

	};
}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});
