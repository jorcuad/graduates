'use strict';

function offerFormCtrl ($http, OfferForm) {
	var vm = this;

	vm.$onInit = function () {
		vm.minDate = new Date();
		vm.form = {"user_id":"","active":"", "private":"","activity_date":"", 
					"offer_name":"", "description":"", "place":"", "category":""}
		vm.form.user_id = 1;
		vm.form.active = true;
		vm.form.private = false;
		vm.activity_hour = ""
		vm.activity_min = ""
		vm.search = ""
		vm.categories = ""
		OfferForm.getCategories().then(function (categories) { vm.categories = categories; })
	};

	vm.create = function(){
		if(check_form(vm.form) && check_time(vm.activity_hour, vm.activity_min)) {

			vm.form.activity_date = add_time(vm.form.activity_date, vm.activity_hour-1, vm.activity_min)

			OfferForm.create(vm.form).then(function (answer) { 
				//TODO Mensaje de all green en TOAST de inicio y redireccionar a pagina inicio
			}, function(answer) {
				//TODO mensaje de error en TOAST
			});
		} else {
			//TODO mostrar toast de error
		}
	}
}

angular.module('graduatesApp').component('offerForm', {
	templateUrl: 'app/offer-form/offer-form.html',
	controller: offerFormCtrl
});

function check_form(form) {
	var is_ok = true
	for(var field in form) {
 		if( String(form[field]) == "" || String(form[field]) === undefined) {
 			is_ok = false
 		}
	}
	return is_ok
}

function check_time(hour, min) {
	var is_ok = true
	if( String(hour) == "" || String(hour) === undefined || String(min) == "" || String(min) === undefined) {
 		return false
	}
	return true
}

function add_time(date, hour, min) { //FIXME
	var hour_sec = 3600000
	var min_sec = 60000
	date.setHours(date.getHours()+hour)
	return new Date(date.getTime() + (min * min_sec))
}