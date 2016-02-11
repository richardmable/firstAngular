// ad ui.router as a dependency in the application
// A note:
// You may be wondering why we have chosen to use ui-router instead of the more standard ngRoute module - 
// ui-router is newer and provides more flexibility and features than ngRoute. We will be using a few of these in this tutorial.
angular.module('flapperNews', ['ui.router'])

// this is the Angular config function to setup a home state
// otherwise() redirects to unspecified routes
.config([
	'stateProvider',
	'urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			// the state is given a name
			.state('home', {
				// the state is given a url
				url: '/home'
				// and a template
				templateUrl: '/home.html'
				// and should be controlled by MainCtrl
				controller: 'MainCtrl'
		});
		$urlRouterProvider.otherwise('home');
	}]);

// this is a service 
// You may be wondering why we're using the keyword factory instead of service. 
// In angular, factory and service are related in that they are both instances of a third entity called provider.
.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;

}]);

.controller('MainCtrl', [
	'$scope',
	//this injects posts service into the main controller
	'posts'
	function($scope, posts){
		//can only have two way data binding with $scope variables
		//this line mirrors the array returned by the service
		//this way, we can display the posts to the view
		$scope.posts = posts.posts;

}]);