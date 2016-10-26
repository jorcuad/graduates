'use strict';

function offersCtrl ($http, $mdDialog, $scope, Offers) {
	var vm = this;
	$scope.formData = {};
	$scope.userlogged= {};

	vm.search = ""
	vm.categories = ""
	vm.category = ""

	vm.$onInit = function () {
		$scope.logged = true;
//		$scope.username = "Manuel";
		$scope.userlogged.id=2;
		$scope.userlogged.name="pablo";
		$scope.userlogged.email="";
		$scope.offerform = {}
		Offers.get().then(function (offers) { vm.offers = offers; })
		// Get all categories
		Offers.getCategories().then(function (categories) { vm.categories = categories; })
	};

	vm.filter = function() {
		var query = ""
		if (vm.search !== "") {
			query = "search="+vm.search
		}
		if (vm.category !== "") {
			if ( query !== "") {
				query = query+"&"
			}
			query = query+"category="+vm.category
		}
    	Offers.search(query).then(function (offers) { vm.offers = offers; })
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
			if( correctDate($scope) && correctName($scope)  && correctPlace($scope) && correctCategories($scope)) {
				$scope.offerform.pub_date = new Date()
				$scope.offerform.user = 1
				$scope.offerform.time = pad($scope.offerform.activity_hour) +":"+ pad($scope.offerform.activity_min)
				var datos = $scope.offerform
				$http.post("http://localhost:8000/offers/", datos)
				.then(function(result) {
					$mdDialog.cancel();
					return result.data;
				});
			} else {
				//TODO dar error
			}
		};
		$scope.formDate="";
	}

	function pad(n) {
		return (n < 10) ? ("0" + n) : n;
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
		var today =  new Date();

		if($scope.offerform.activity_date > today) {
			return true;
		} else {
			return false;
		}
	};
	$scope.closeOffer=function (offer){
		offer.active = !offer.active;
		$http.put("http://localhost:8000/offers_edit/", offer)
				.then(function(result) {
					$mdDialog.cancel();
					return result.data;
				});
	};
}

angular.module('graduatesApp').component('offers', {
	templateUrl: 'app/offers/offers.html',
	controller: offersCtrl
});

