'use strict';

function offersCtrl (Offers) {
	var vm = this;

	vm.$onInit = function () {
		vm.offers = Offers.get().then(function (offers) { vm.offers = offers; })
	};

}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});


