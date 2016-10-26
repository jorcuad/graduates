'use strict';

function registerCtrl (Utils) {
	var vm = this;

	vm.$onInit = function () {
		vm.form = {}		
	};


	vm.register = function(){
		RegisterService.register({
									"nombre":vm.form.nombre, 
									"apellido":vm.form.apellido, 
									"email": vm.form.email,
									"contrasena":vm.form.contrasena
								})

	}


	vm.checkPass = function() {

		if(vm.form.contrasena != vm.form.confirmacontrasena ){
			Utils.toast("Error : Las contraseñas no coinciden.", true)

		}
	}

}

angular.module('graduatesApp').component('register', {
	templateUrl: 'app/register/register.html',
	controller: registerCtrl
});
