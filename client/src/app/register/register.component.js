'use strict';

function registerCtrl (Utils, RegisterService,$routeParams, $scope, $location) {
	var vm = this;

	vm.$onInit = function () {
		vm.form = {}
	};


	vm.register = function($routeParams, $scope,$location){
		RegisterService.register({
				"username":vm.form.username,
				"first_name":vm.form.nombre,
				"last_name":vm.form.apellido,
				"email": vm.form.email,
				"password":vm.form.contrasena
			}).then(function (answer, $routeParams,$scope, $location) { //TODO readable date
				if (answer.status != -1 && answer.status != 400){
					Utils.toast(answer.status + "El registro se ha realizado.", false);
					//$location.path( "/" );
					window.location ="http://localhost:3000/#";
				}else{
					Utils.toast(answer.status +"Error al registrarse. Vuelva a intentarlo.", true)
				}

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
