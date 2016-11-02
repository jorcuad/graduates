'use strict';


function offersCtrl ($http, $scope, $mdSidenav, $mdMedia, Offers, Utils, Session) {


	var vm = this;
	$scope.formData = {};
	$scope.userlogged= {};

	vm.search = ""
	vm.categories = ""
	vm.category = []

	vm.$onInit = function () {
		vm.isClosed = false
		vm.min_date = new Date()
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
		Offers.search("").then(function (answer) {
			vm.offers = answer.data;
		}, function(answer) {
			Utils.toast(answer.status + " : Error al obtener las ofertas, recargue la página e intentelo de nuevo.")
		})

		$scope.offerform = {}
		$scope.logged = Session.isLogged()

		if(Session.isLogged()) {
			$scope.user = Session.getUser()
			Offers.getFavorites($scope.user.id).then(function (favorites) { vm.favorites = favorites; })
		}

	};

	/* Categories methods */
	$scope.toggle = function (item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		}
		else {
			list.push(item);
		}
		filter()
	};

	$scope.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};

	/* SideNav Methods */
	vm.toggleBar = function () {
		$mdSidenav('right2').open();
	}

	$scope.isOpen = function() {
		var sidenav = $mdSidenav('right');
		return sidenav.isLockedOpen() || sidenav.isOpen();
	}

	$scope.check_size = function () {
		return $mdMedia('(min-width: 850px)')
	}

	vm.closeBar = function () {
		$mdSidenav('right').close();
		vm.isClosed = !vm.isClosed
	}

	$scope.isClosedByUser = function () {
		return vm.isClosed
	}

	$scope.isVisibleOpen = function () {
		return (vm.isClosed && $mdMedia('(min-width: 850px)'))
	}
	$scope.isVisibleClosed = function () {
		return (!vm.isClosed && $mdMedia('(min-width: 850px)'))
	}

	$scope.isVisible = function () {
		return (!vm.isClosed || !$mdMedia('(min-width: 850px)'))
	}

	vm.filter_bar = function() {
		filter()
	}

	function filter () {
		var query = ""
		if (vm.search !== "") {
			query = "search="+vm.search
		}
		if (vm.category.length > 0) {
			if(query !== "") {
				vm.category.forEach(function(element, index) {
					if( index == 0) {
						query = query+"&category="+element.category_name
					} else {
						query = query+" "+element.category_name
					}
				})
			} else {
				vm.category.forEach(function(element) {
					if( query == "") {
						query = "category="+element.category_name
					} else {
						query = query+" "+element.category_name
					}
				})
			}
		}
		if ( vm.sort_value != undefined ) {
			if(query !== "") {
				query = query + "&sort="+vm.sort_value
			} else {
				query = "sort="+vm.sort_value
			}
		}

		if( vm.ini_date != undefined ) {
			if(query !== "") {
				query = query + "&gt="+vm.ini_date.toLocaleDateString();
			} else {
				query = "gt="+vm.ini_date.toLocaleDateString();
			}
		}

		if( vm.fin_date != undefined ) {
			if(query !== "") {
				query = query + "&lt="+vm.fin_date.toLocaleDateString();
			} else {
				query = "lt="+vm.fin_date.toLocaleDateString();
			}
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
