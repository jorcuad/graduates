'use strict';

function registerCtrl (	 Utils) {
	var vm = this;

	vm.$onInit = function () {

		//cargar aquí las variables 
		
		
	};

}

angular.module('graduatesApp').component('register', {
	templateUrl: 'app/register/register.html',
	controller: registerCtrl
});


function checkPass ( pass, cpass ) {
	alert("Estoydentro");

}