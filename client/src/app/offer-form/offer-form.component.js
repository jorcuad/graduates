'use strict';

function offerFormCtrl ($http, $routeParams, OfferForm, OfferDetailService, Utils) {
	var vm = this;

	vm.$onInit = function () {
		vm.categories = ""
		vm.minDate = new Date();
		
		//FIXME recuperar horas en caso de que sea edicion
		vm.activity_hour = ""
		vm.activity_min = ""
		vm.search = ""

		OfferForm.getCategories().then(function (answer) { 
			vm.categories = answer.data; 
		}, function (answer) {
			Utils.toast(answer.status + " : Error al obtener las categorías, recargue la página e intentelo de nuevo.", true)
		})

		OfferDetailService.get($routeParams.orderId)
			.then(function (answer) { //TODO readable date
				if (answer.status == 200){
					vm.editar = true; 
					vm.offer = answer.data;
					var dateObject = new Date(Date.parse(vm.offer.pub_date));
					var dateReadable = dateObject.toLocaleDateString();
					vm.offer.pub_date = dateReadable
					vm.form = {"id": vm.offer.id, "user_id":vm.offer.user_id,"active":vm.offer.active, "private":vm.offer.private,"activity_date":new Date(vm.offer.activity_date), 
					"offer_name":vm.offer.offer_name, "description":vm.offer.description,
					"place":vm.offer.place, "categories":vm.offer.categories}
				}else{
					vm.editar = false;
					vm.form = {"user_id":"","active":"", "private":"","activity_date":"", 
					"offer_name":"", "description":"", "place":"", "categories":"Categoría"}
					vm.form.active = true;
					vm.form.private = false;
					vm.form.user_id = 1
				}

			}, function (answer) {
				Utils.toast(answer.status + " : Error al obtener la información de la oferta, recargue la página.", true)
			})
	};

	vm.create = function(){
		alert(vm.form.categories)
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

	vm.update = function(){
		alert(vm.form.categories)
		if(check_form(vm.form) && check_time(vm.activity_hour, vm.activity_min)) {

			vm.form.activity_date = add_time(vm.form.activity_date, vm.activity_hour-1, vm.activity_min)

			OfferForm.update(vm.form).then(function (answer) { 
				Utils.toast(answer.status + " : Oferta actualizada correctamente.", false)
				//TODO redirect a inicio
			}, function(answer) {
				Utils.toast(answer.status + " : Error al actualizar la oferta.", true)
			});
		} else {
			Utils.toast("Error : El formato de los datos no es correcto.", true)
		}
	}

	vm.selected = function(cat) {
		if(cat == vm.form.categories){
			return true
		} else {
			return false
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

	if ( form.categories === "Categoría") {
		is_ok = false
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



