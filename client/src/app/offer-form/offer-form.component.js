'use strict';

function offerFormCtrl ($scope, $http, $location, $routeParams, OfferForm, OfferDetailService, Utils, Session) {
	var vm = this;

	vm.$onInit = function () {
		vm.categories = ""
		vm.minDate = new Date();
		vm.offer={}
		vm.activity_hour = ""
		vm.activity_min = ""
		vm.search = ""

		OfferForm.getCategories().then(function (answer) {
			vm.categories = answer.data;
		}, function (answer) {
			Utils.toast("Código "+ answer.status + " : Error al obtener las categorías, recargue la página e intentelo de nuevo.", true)
		})

		OfferDetailService.get($routeParams.orderId)
			.then(function (answer) { //TODO readable date
				vm.form = {};
				if (answer.status == 200){
					vm.editar = true;
					vm.offer = answer.data;
					
					
					var dateObject = new Date(Date.parse(vm.offer.pub_date));
					var dateReadable = dateObject.toLocaleDateString();
					var date_activity= new Date(Date.parse(vm.offer.activity_date))
					vm.offer.pub_date = dateReadable;
					vm.activity_hour= date_activity.getHours();
					vm.activity_min = date_activity.getMinutes();

					if(vm.offer.maxContacts == -1){
						vm.withoutLimit= true;
						vm.disableInput=true;
						vm.hideInput=true;
						vm.form.maxContacts=-1						
					}
					else{
						vm.withoutLimit = false;
					}
					if(vm.withoutLimit){
						vm.offer.maxContacts=-1;
					}
					vm.form = {"id": vm.offer.id, "user":vm.offer.user.id,
					"active":vm.offer.active, "public":vm.offer.public,
					"activity_date":new Date(vm.offer.activity_date),
					"offer_name":vm.offer.offer_name, "description":vm.offer.description,
					"place":vm.offer.place, "categories":vm.offer.categories,
					"maxContacts":vm.offer.maxContacts}
					if (vm.offer.active == true){
						vm.form.active2 = "Activa";
					}else {
						vm.form.active2 = "Inactiva";
					}

					if (vm.offer.public == true){
						vm.form.public2 = "Pública";
					}else {
						vm.form.public2 = "Privada";
					}
				}else{
					vm.editar = false;
					vm.form = {"user":"","active":"", "public":"","activity_date":"",
					"offer_name":"", "description":"", "place":"", "categories":"Categoría", "maxContacts":""}
					vm.form.active = true;
					vm.form.public = true;
					vm.form.user = Session.getUser().id
					vm.form.active2 = "Activa";
					vm.form.public2 = "Pública";
				}

			}, function (answer) {
				Utils.toast("Código "+ answer.status + " : Error al obtener la información de la oferta, recargue la página.", true)
			})
	};
	
	$scope.onChange = function() {
		if(vm.form.active == true){
			vm.form.active2 = "Activa";
		}else{
			vm.form.active2 = "Inactiva";
		}
	};
 
	$scope.onChange2 = function() {
		if(vm.form.public == true){
			vm.form.public2  = "Pública";
		}else{
			vm.form.public2  = "Privada";
		}
	};

	vm.create = function(){
		if(check_form(vm.form) && check_time(vm.activity_hour, vm.activity_min)) {

			vm.form.activity_date.setHours(vm.activity_hour,vm.activity_min);

			OfferForm.create(vm.form).then(function (answer) {
				$location.path("/")
				Utils.toast("Oferta creada correctamente.", false)
			}, function(answer) {
				Utils.toast("Código "+ answer.status + " : Error al crear la oferta.", true)
			});
		} else {
			Utils.toast("Error : El formato de los datos no es correcto.", true)
		}
	}

	vm.update = function(){
		if(check_form(vm.form) && check_time(vm.activity_hour, vm.activity_min)) {

			OfferForm.update(vm.form).then(function (answer) {
				$location.path("/")
				Utils.toast("Oferta actualizada correctamente.", false)
			}, function(answer) {
				Utils.toast("Código "+ answer.status + " : Error al actualizar la oferta.", true)
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

	vm.checkLimit = function(){
		return vm.withoutLimit;
	}

	vm.changeLimit = function(){
		vm.withoutLimit = !vm.withoutLimit;
		if(vm.withoutLimit){
			vm.disableInput=true;
			vm.hideInput=true;
			vm.form.maxContacts=-1
		}
		else{
			vm.form.maxContacts=1
		}
	}

	vm.checkMaxContacts = function(){
		return vm.form.maxContacts;
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
		if( form[field] == null) {
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
