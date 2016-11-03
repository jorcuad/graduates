'use strict';

function registerCtrl (Utils, RegisterService) {
	var vm = this;

	vm.$onInit = function () {
		vm.form = {}

	};


	vm.register = function(){
		if (vm.form.contrasena == vm.form.confirmacontrasena){
			RegisterService.register({
					"username":vm.form.username,
					"first_name":vm.form.nombre,
					"last_name":vm.form.apellido,
					"email": vm.form.email,
					"password":vm.form.contrasena
				}).then(function (answer) {
			vm.register = answer.data;
				if (answer.status >= 200 && answer.status <=299){
					Utils.toast("El registro se ha realizado correctamente.", false);
					window.location="http://localhost:3000/#/";

				}else{
					Utils.toast("Código "+answer.status + " : Error al realizar el registro, recargue la página e intentelo de nuevo.", true)
				}
		})			
		}else{
			Utils.toast("Error : Las contraseñas no coinciden.", true);

		}


	}



}

angular.module('graduatesApp').component('register', {
	templateUrl: 'app/register/register.html',
	controller: registerCtrl
});


					