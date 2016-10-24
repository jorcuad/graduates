'use strict';

function loginCtrl (LoginService) {
	var vm = this;

	vm.$onInit = function () {
		
	};

	vm.do_login = function () {
		if ( check_login ( vm.nick, vm.password ) ) {
			LoginService.login({"username":vm.nick, "password":vm.password})
						.then( function(answer) {
							//TODO, sacar toast de todo ok.
						}, function() {
							//TODO, sacar toast de ha habido un error.
						});
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
	
	if ( nick_valid && pass_valid && pass !== undefined && nick !== undefined) {
		return true;
	} else {
		return false;
	}
}