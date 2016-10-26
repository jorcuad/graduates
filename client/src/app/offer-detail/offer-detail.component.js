'use strict';

function offerDetailCtrl ($scope, $routeParams, OfferDetailService) {
	var vm = this;
	$scope.userlogged={};
	vm.$onInit = function () {

		OfferDetailService.get($routeParams.orderId)
			.then(function (result) {
				vm.offer = result;
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				var dateReadable = dateObject.toLocaleDateString();
				vm.offer.pub_date = dateReadable
			})
		$scope.userlogged.id=2;
		$scope.userlogged.name="pablo";
		$scope.userlogged.email="";
	};
	function closeOffer(offer){
		alert(offer);
		$http.put("http://localhost:8000/offers/", offer)
				.then(function(result) {
					$mdDialog.cancel();
					return result.data;
				});
	}
}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});