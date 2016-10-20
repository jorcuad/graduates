'use strict';

function offersCtrl ($http, $mdDialog, $scope, Offers) {
	var vm = this;
	$scope.formData = {};

	$scope.myDate = new Date();
	
	$scope.minDate = new Date(
      $scope.myDate.getDate(),
      $scope.myDate.getMonth(),
      $scope.myDate.getFullYear());
	//var logged = true;

	//TODO: poner mas bonito
	$scope.logged = true;
	$scope.username = "Manuel";

	$scope.showAdvanced = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			//templateUrl: 'app/offers/inscribir_oferta_dialog.html',
			templateUrl: 'app/offers/offerform.html',
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	};

	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
			alert(Date.now);
		};
		$scope.save = function(offerform) {
			alert('hola');

			myValidation(offerform);
			$http.post("http://192.168.1.51:8001/offers", offerform)
			.then(function(result) {
				return result.data;
			});
      /*vm.offers = Offers.post(offerform).then(
			function (offers) {
				vm.offers = offers;
			})*/
		};

		function myValidation(offerform) {
			 if(offerform.offerer_name ==" " || offerform.offerer_name == null){
			 	alert("NO HAY OFERTANTE");
			 }
			 if(offerform.description == null || offerform.description == ""){
			 	alert("NO HAY DESCRIPCION");
			 }
			 if(offerform.pub_date == null || offerform.pub_date == ""){
			 	alert("NO HAY FECHA");
			 	cancel();
			 }
		
		}

	}
	vm.$onInit = function () {
		vm.offers = Offers.get().then(
			function (offers) {
				vm.offers = offers;
			})

	};

}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});

