'use strict';

angular.module('graduatesApp').service('Session', function($cookies) {

	var cookie_name = "spicepeople"

	this.create = function(token, username) {
		var now = new Date()
		var expireDate = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
		var domain = "" //TODO añadir con dominio final (?)
		var path = "/"
		$cookies.putObject(cookie_name, {"token":token, "name": username}, {'expires': expireDate, 'path': path});
	};

	this.delete = function() {
		$cookies.remove(cookie_name);
	};

	this.getUser = function() {
		return ($cookies.getObject(cookie_name).name)
	}

	this.getToken = function() {
		return ($cookies.getObject(cookie_name).token)
	}

	this.isLogged = function() {
		try {
			$cookies.getObject(cookie_name).name
			return true
		} catch (e) {
			return false
		}
	}
});