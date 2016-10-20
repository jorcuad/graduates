'use strict';

function offerDetailCtrl ($scope, $routeParams, OfferDetailService) {
	var vm = this;

	vm.$onInit = function () {
		OfferDetailService.get($routeParams.orderId)
			.then(function (result) {
				vm.offer = result;
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				var dateReadable = dateObject.toLocaleDateString();
				vm.offer.pub_date = dateReadable
			})
	};
}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});