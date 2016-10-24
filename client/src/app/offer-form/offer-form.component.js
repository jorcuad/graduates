'use strict';

function offerFormCtrl ($http, OfferForm) {
	var vm = this;

	vm.search = ""
	vm.categories = ""
	vm.category = ""

	vm.$onInit = function () {
		vm.minDate = new Date();
		vm.username = "Manuel";
		vm.offerform = {}
		OfferForm.getCategories().then(function (categories) { vm.categories = categories; })
	};
}

angular.module('graduatesApp').component('offerForm', {
	templateUrl: 'app/offer-form/offer-form.html',
	controller: offerFormCtrl
});

/*
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
*/