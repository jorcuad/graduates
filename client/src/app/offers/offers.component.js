'use strict';

function offersCtrl (Offers) {
	var vm = this;

	vm.search = ""
	vm.category = ""
	vm.categories = ""

	vm.$onInit = function () {
		// Get all offers
		Offers.get().then(function (offers) { vm.offers = offers; })
		// Get all categories
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