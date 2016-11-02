'use strict';
function navbarCtrl ($scope,$route, $mdPanel, Utils, Session, Panels) {
	var vm = this

	vm.$onInit = function () {

		$scope.logged = Session.isLogged();

		if($scope.logged) {
			$scope.username = Session.getUser()
		}
	}

	$scope.getLogged = function () {
		$scope.logged = Session.isLogged();
		return $scope.logged;
	}

	$scope.logout = function () {
		Session.delete();
		$scope.logged = Session.isLogged();
		$route.reload();

		Utils.toast("¡¡HASTA PRONTO!!");
	}

	$scope.showLogin = function (ev) {
		Panels.showPanel(ev)
	}
}

angular.module('graduatesApp').component('appNavbar', {
	templateUrl: 'app/navbar/app-navbar.html',
	controller: navbarCtrl
});

