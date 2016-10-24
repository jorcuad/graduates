'use strict';

function offerFormCtrl ($http, OfferForm, Utils) {
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
		OfferForm.getCategories().then(function (answer) { 
			vm.categories = answer.data; 
		}, function (answer) {
			Utils.toast(answer.status + " : Error al obtener las categorías, recargue la página e intentelo de nuevo.", true)
		})
	};

	vm.create = function(){
		if(check_form(vm.form) && check_time(vm.activity_hour, vm.activity_min)) {

			vm.form.activity_date = add_time(vm.form.activity_date, vm.activity_hour-1, vm.activity_min)

			OfferForm.create(vm.form).then(function (answer) { 
				Utils.toast(answer.status + " : Offerta creada correctamente.", false)
				//TODO redirect a inicio
			}, function(answer) {
				Utils.toast(answer.status + " : Error al crear la oferta.", true)
			});
		} else {
			Utils.toast("Error : El formato de los datos no es correcto.", true)
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
		if( String(form[field]) == "" || angular.isUndefined(String(form[field]))) {
			is_ok = false
		}
	}
	return is_ok
}

function check_time(hour, min) {
	if( String(hour) == "" || angular.isUndefined(String(hour)) || String(min) == "" || angular.isUndefined(String(min)) ) {
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