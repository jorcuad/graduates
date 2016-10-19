'use strict';

function offerDetailCtrl ($scope, $routeParams, OfferDetailService) {
	var vm = this;

	vm.$onInit = function () {
		OfferDetailService.get($routeParams.orderId)
			.then(function (result) {
				vm.offer = result;
				console.log(vm.offer.pub_date)
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				console.log(dateObject)
				var dateReadable = dateObject.toLocaleDateString();
				console.log(dateReadable)
				vm.offer.pub_date = dateReadable
			})
	};

}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});