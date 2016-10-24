'use strict';

angular.module('graduatesApp').service('Utils', function ($http, $mdToast) {

	this.toast = function (msg, error) {
		$mdToast.show( $mdToast.simple().textContent(msg).hideDelay(3000) );
	}

});
