'use strict';

function offersCtrl ($http, $mdDialog, $scope, Offers) {
	var vm = this;
	$scope.formData = {};

	//TODO: poner mas bonito
	$scope.logged = true;
	$scope.username = "Manuel";
	vm.$onInit = function () {
			
	$scope.myDate = ""
	$scope.offerform = {}

	vm.offers = Offers.get().then(
		function (offers) {
			vm.offers = offers;
		})
	};


	$scope.showAdvanced = function(ev) {
		$mdDialog.show({
			controller: DialogController,
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
		};
		$scope.save = function(offerform) {
			console.log($scope.offerform)
			if( correctDate($scope) && correctName($scope)  && correctPlace($scope) && correctCategories($scope)) {
				alert("llega");
				$http.post("http://192.168.1.51:8001/offers", offerform)
				.then(function(result) {
					return result.data;
				});
			} else {
				//TODO dar error
			}
		};
		$scope.formDate="";
	}

	function correctName($scope){
		if($scope.offerform.name==""){
			return false;
			}
		else {
			return true;
		}
	}
	function correctPlace($scope){
		if($scope.offerform.place==""){
			return false;
			}
		else {
			return true;
		}
	}
	function correctCategories($scope){
		if($scope.offerform.categories==""){
			return false;
			}
		else {
			return true;
		}
	}
	function correctDate($scope){
		console.log($scope)
		var today =  new Date();

		if($scope.offerform.pub_date > today) {
			console.log("myDate " + today + '-->'+ $scope.offerform.pub_date);
			return true;
		} else {
			console.log("today "+ today + '-->'+ $scope.offerform.pub_date );
			return false;
		}
	};
}
angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});

