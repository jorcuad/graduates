'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.offers',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $routeProvider.otherwise({redirectTo: '/offers'});
}]);
