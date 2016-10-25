'use strict';

function loginCtrl (LoginService, Utils, Session) {
	var vm = this;

	vm.$onInit = function () {
		
	};

	vm.do_login = function () {
		if ( check_login ( vm.nick, vm.password ) ) {
			LoginService.login({"username":vm.nick, "password":vm.password})
						.then( function(answer) {
							Session.isLogged = true;
							Session.username = "Manuel";
							Utils.toast(answer.status + " : Usuario loggeado correctamente.", false)
						}, function(answer) {
							Session.isLogged = true;
							Session.username = "Manuel";
							Utils.toast(answer.status + " : Datos de login incorrectos.", true)
						});
		} else {
			Utils.toast("Error : Datos de login incorrectos.", true)
		}
	}
}

angular.module('graduatesApp').component('login', {
	templateUrl: 'app/login/login.html',
	controller: loginCtrl
});

function check_login ( nick, pass ) {
	var nick_regex = new RegExp('^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?![_.])$');
	var pass_regex = new RegExp('^(?=.{8,20}$)[a-zA-Z0-9@*#]+$')
	var nick_valid = nick_regex.exec(nick);
	var pass_valid = pass_regex.exec(pass);
	
	if ( nick_valid && pass_valid && angular.isDefined(pass) && angular.isDefined(nick) ) {
		return true;
	} else {
		return false;
	}
}