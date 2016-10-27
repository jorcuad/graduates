'use strict';

function offerDetailCtrl ($http, $scope, $routeParams, OfferDetailService, Utils, Session) {

	var vm = this;
	$scope.offer={};
	$scope.userlogged={};
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

		$scope.userlogged = Session.getUser()
	};

	$scope.changeStateOffer=function (offer){
		offer.active = !offer.active;
		$http.put("http://localhost:8000/offers_edit/", offer)
				.then(function(result) {
					$mdDialog.cancel();
					return result.data;
				});
	};

	$scope.getStateOffer = function (offer){
		return offer.active;
	};
}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});