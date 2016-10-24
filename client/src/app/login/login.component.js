'use strict';

function loginCtrl (LoginService) {
	var vm = this;

	vm.$onInit = function () {
		
	};

	vm.do_login = function () {
		LoginService.login({"username":vm.nick, "password":vm.password})
					.then( function(answer) {
						//TODO, sacar toast de todo ok.
					}, function() {
						//TODO, sacar toast de ha habido un error.
					});
	}
}

angular.module('graduatesApp').component('login', {
	templateUrl: 'app/login/login.html',
	controller: loginCtrl
});