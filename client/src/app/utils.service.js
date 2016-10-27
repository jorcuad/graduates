'use strict';

angular.module('graduatesApp').service('Utils', function ($http, $mdToast) {

	this.toast = function (msg, error) {
		if(error) {
			$mdToast.show( $mdToast.simple().textContent(msg).hideDelay(3000).theme("error-toast") );
		} else {
			$mdToast.show( $mdToast.simple().textContent(msg).hideDelay(3000).theme("success-toast") );
		}
	}

	this.isError = function ( httpcode ) {
		var code = parseInt(httpcode)
		if ( code >= 200 && code < 300) {
			return false
		} else if ( code >= 400 ) {
			return true
		}
	}

});
