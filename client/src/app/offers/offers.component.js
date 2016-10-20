'use strict';

function offersCtrl (Offers) {
	var vm = this;

	vm.search = ""
	vm.category = ""

	vm.$onInit = function () {
		Offers.get().then(function (offers) { vm.offers = offers; })
	};

	vm.filter = function() {
		console.log("FILTRANDO")
		var query = ""
		if (vm.search !== "") {
			query = "search="+vm.search
		}
		if (vm.category !== "") {
			if ( query !== "") {
				query = query+"&"
			query = query+"category="+vm.category
		}
    	Offers.search(query).then(function (offers) { vm.offers = offers; })
  	};

}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});