'use strict';

function registerCtrl (Utils) {
	var vm = this;

	vm.$onInit = function () {
		vm.form = {}

		
		
	};

	vm.checkPass = function(  ) {

		if(vm.form.contrasena == vm.form.confirmacontrasena 
			&& angular.isDefined(vm.form.confirmacontrasena)
			 && angular.isDefined(vm.form.contrasena)){
			//contraseña coincide y no está vacía
		}else{
			//contraseña no coincide o está vacía
		}
	}

}

angular.module('graduatesApp').component('register', {
	templateUrl: 'app/register/register.html',
	controller: registerCtrl
});


