'use strict';


function offerDetailCtrl ($http, $location, $route, $scope, $mdDialog, $routeParams, OfferDetailService, Utils, Session) {

	var vm = this;
	$scope.offer={};
	$scope.offer.active=true;
	$scope.offer.favorites=[];
	$scope.userlogged={};

	vm.$onInit = function () {
		OfferDetailService.get($routeParams.orderId)
			.then(function (answer) { //TODO readable date

				if(answer.data.detail != null){
					$location.path("/404")
				}

				vm.offer = answer.data;
				$scope.offer= vm.offer;
				var dateObject = new Date(Date.parse(vm.offer.pub_date));
				var dateReadable = dateObject.toLocaleDateString();
				vm.offer.pub_date = dateReadable
				vm.offer.pub_date = dateReadable;
				vm.stringLimit = ''
				vm.limit = false;
				if(vm.offer.maxContacts!=0 ){
					vm.limit=true;
				}
				if(vm.offer.maxContacts == -1){
					vm.stringLimit= 'Sin límite'
				}
				else{
					vm.stringLimit = vm.offer.maxContacts
				}
			}, function (answer) {
				Utils.toast(answer.status + " : Error al obtener la información de la oferta, recargue la página.", true)
			})
		$scope.userlogged = Session.getUser();
			
		
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
			OfferDetailService.deleteOffer($routeParams.orderId)
				.then(function (answer) { //TODO readable date
					$location.path('/')
					Utils.toast(answer.status + ": La oferta ha sido borrada correctamente.", false)
				}, function (answer) {
					Utils.toast(answer.status + ": La oferta no ha podido ser borrada, vuelva a intentarlo", true)
				});
		})
	};

	$scope.getStateOffer = function (offer){
		$scope.offer = offer;
		return  offer.active;
	};
/*	$scope.shareLink = function (){
		alert(window.location.href)
	};

*/  $scope.shareLink = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Copia la siguiente URL para compartir esta oferta')
        .textContent(window.location.href)
        .ariaLabel('Alert Dialog Demo')
        .ok('Cerrar')
        .targetEvent(ev)
    );
  };

	$scope.isFavorite = function (offer){
		$scope.offer = offer;

		if(offer.favorites != null){
			if (offer.favorites.indexOf($scope.userlogged.id) != -1){
				return true;
			}
			return false;
		}
		return false;
	};
	$scope.addFavorite = function (userId,offerId){
		OfferDetailService.addFavorite(userId,offerId);
	}
	$scope.deleteFavorite = function (userId,offerId){
		OfferDetailService.deleteFavorite(userId,offerId);
	}
	$scope.changeStateOffer = function (offer){
		$scope.offer.active = !offer.active;
		OfferDetailService.changeStateOffer($scope.offer)
		.then(function(answer) {
			if(offer.active)
				Utils.toast(answer.status+": Oferta abierta.");
			else
				Utils.toast(answer.status+": Oferta cerrada.");
		}, function(answer) {
			Utils.toast(answer.status + ": Ha habido un problema cambiando el estado de la oferta.");
		});
		

	};

	$scope.contact = function(ev) {
		var confirm = $mdDialog.prompt()
			.title('Contactar con el creador de la oferta.')
			.textContent('Presentate y concreta los detalles.')
			.placeholder('Mensaje')
			.ariaLabel('Mensaje')
			.initialValue('Hola, me llamo ' + $scope.userlogged.username + ' y me gustaría apuntarme a tu oferta.')
			.targetEvent(ev)
			.ok('Enviar')
			.cancel('Cancelar');

		$mdDialog.show(confirm).then(function(result) {
			OfferDetailService.sendMail($scope.offer.id, result)
			.then(function(result) {
				Utils.toast(result.status + ": Mensaje enviado correctamente.");
			}, function(result) {
				Utils.toast(result.status + ": El mensaje no ha podido enviarse.");
			})	
		});
	};

}

angular.module('graduatesApp').component('offerDetail', {
	templateUrl: 'app/offer-detail/offer-detail.html',
	controller: offerDetailCtrl
});
