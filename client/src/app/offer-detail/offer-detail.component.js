'use strict';

function offerDetailCtrl ($http, $scope, $routeParams, OfferDetailService, Utils, Session) {

	var vm = this;
	$scope.offer={};
	$scope.offer.active=true;
	$scope.userlogged={};
	vm.$onInit = function () {
		OfferDetailService.get($routeParams.orderId)
			.then(function (answer) { //TODO readable date
				vm.offer = answer.data;
				$scope.offer= vm.offer;
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				var dateReadable = dateObject.toLocaleDateString();
				vm.offer.pub_date = dateReadable
			}, function (answer) {
				Utils.toast(answer.status + " : Error al obtener la información de la oferta, recargue la página.", true)
			})

		$scope.userlogged = Session.getUser()
	};

	$scope.getStateOffer = function (offer){
		$scope.offer = offer;
		return  offer.active;
	};
	$scope.changeStateOffer = function (offer){
		$scope.offer.active = !offer.active;
		OfferDetailService.changeStateOffer($scope.offer);
		if(offer.active)
		Utils.toast("Oferta abierta.");
		else
		Utils.toast("Oferta cerrada.");

	};
}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});