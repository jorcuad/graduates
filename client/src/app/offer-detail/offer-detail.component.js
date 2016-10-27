'use strict';

function offerDetailCtrl ($http,$scope, $mdDialog, $routeParams, OfferDetailService, Utils, Session) {

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

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('¿Desea eliminar esta oferta?')
          .textContent('Si elimina esta oferta no podrá recuperarla posteriormente.')
          .targetEvent(ev)
          .ok('Aceptar')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
    		    	alert("has dicho que si")


	
		OfferDetailService.deleteOffer($routeParams.orderId)
			.then(function (answer) { //TODO readable date
				Utils.toast(answer.status + "Se ha borrado", false)


			}, function (answer) {
				Utils.toast(answer.status + "No se ha borrado	.", true)
			})



	    }, function() {


	    	alert("has dicho que no")

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