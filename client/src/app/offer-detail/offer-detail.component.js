'use strict';

function offerDetailCtrl ($scope, $routeParams, OfferDetailService) {
	var vm = this;

	vm.$onInit = function () {
		vm.offers = Offers.get().then(function (offerDetailService) { vm.offers = offers; })
	};

	$scope.order_id = $routeParams.orderId;

}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});