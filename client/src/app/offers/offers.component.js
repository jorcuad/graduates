'use strict';

function offersCtrl ($http, $scope, Offers) {
	var vm = this;
	$scope.formData = {};

	vm.search = ""
	vm.categories = ""
	vm.category = ""

	vm.$onInit = function () {
		$scope.logged = true;
		$scope.username = "Manuel";
		$scope.offerform = {}
		Offers.get().then(function (offers) { vm.offers = offers; })
		Offers.getCategories().then(function (categories) { vm.categories = categories; })
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
		Offers.search(query).then(function (offers) { vm.offers = offers; })
	};
}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});

