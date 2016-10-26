'use strict';

angular.module('graduatesApp').service('Utils', function ($http, $mdToast) {

	this.toast = function (msg, error) {
		if(error) {
			$mdToast.show( $mdToast.simple().textContent(msg).hideDelay(3000).theme("error-toast") );
		} else {
			$mdToast.show( $mdToast.simple().textContent(msg).hideDelay(3000).theme("success-toast") );
		}
	}

});
