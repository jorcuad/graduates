'use strict';

angular.module('graduatesApp').service('Panels', function ($http, $mdPanel) {
	var css = ""
	var panel = ""

	this.showPanel = function(ev) {
		css = ".login-button"
		var position = $mdPanel.newPanelPosition()
			.relativeTo(css)
			.addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);

		var config = {
			attachTo: angular.element(document.body),
			controller: PanelCtrl,
			templateUrl:'app/views/login_panel.html',
			panelClass: "dialog",
			position: position,
			openFrom: ev,
			clickOutsideToClose: true,
			escapeToClose: true,
			focusOnOpen: false,
			zIndex: 2
		};

		$mdPanel.open(config);
	};

	this.closePanel = function() {
		var panelRef = panel

		panelRef && panelRef.close().then(function() {
			angular.element(document.querySelector('.login-button')).focus();
			panelRef.destroy();
		});
	};

	function PanelCtrl($scope, mdPanelRef) {
  		panel = mdPanelRef;
	}

});
