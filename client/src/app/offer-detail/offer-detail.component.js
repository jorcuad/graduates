'use strict';

function offerDetailCtrl ($scope, $routeParams, OfferDetailService, Utils) {
	var vm = this;

	vm.$onInit = function () {
		OfferDetailService.get($routeParams.orderId)
			.then(function (answer) { //TODO readable date
				vm.offer = answer.data;
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				var dateReadable = dateObject.toLocaleDateString();
				vm.offer.pub_date = dateReadable
			}, function (answer) {
				Utils.toast(answer.status + " : Error al obtener la información de la oferta, recargue la página.", true)
			})
	};
}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});