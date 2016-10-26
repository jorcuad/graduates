'use strict';

function offerDetailCtrl ($http,$scope, $routeParams, OfferDetailService) {
	var vm = this;
	$scope.offer={};
	$scope.userlogged={};
	vm.$onInit = function () {

		OfferDetailService.get($routeParams.orderId)
			.then(function (result) {
				vm.offer = result;
				$scope.offer=vm.offer;
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				var dateReadable = dateObject.toLocaleDateString();
				vm.offer.pub_date = dateReadable
			})
		$scope.userlogged.id=2;
		$scope.userlogged.name="pablo";
		$scope.userlogged.email="";
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