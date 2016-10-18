'use strict';

function offersCtrl ($mdDialog, $scope, Offers) {
	var vm = this;
	//var logged = true;

	//TODO: poner mas bonito
	$scope.logged = true;
	$scope.username = "Manuel";

	$scope.showAdvanced = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'app/offers/inscribir_oferta_dialog.html',
			//templateUrl: 'app/offerform/offerform.html',
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
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
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
