// ad ui.router as a dependency in the application
// A note:
// You may be wondering why we have chosen to use ui-router instead of the more standard ngRoute module - 
// ui-router is newer and provides more flexibility and features than ngRoute. We will be using a few of these in this tutorial.
var myApp = angular.module('flapperNews', ['ui.router'])

// this is the Angular config function to setup a home state
// otherwise() redirects to unspecified routes
myApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			// the state is given a name
			.state('home', {
				// the state is given a url
				url: '/home',
				// and a template
				templateUrl: 'home.html',
				// and should be controlled by MainCtrl
				controller: 'MainCtrl'
			})
			// the posts state configuration
			.state('.posts', {
				// brackets around id to indicate it is a route parameter
				url: '/posts',
				templateUrl: 'partial-comments.html',
				controller: 'PostsCtrl'
			})

			.state('party', {
				url: '/party',
				template: '<h1>HELLO THIS LINK IS NOW WORKING!</h1>'

			})

		$urlRouterProvider.otherwise('home');
	}]);

// this is a service 
// You may be wondering why we're using the keyword factory instead of service. 
// In angular, factory and service are related in that they are both instances of a third entity called provider.
myApp.factory('posts', [function(){
	var o = {
		posts: [{title: 'A new post!', link: "www.google.com", upvotes: 0}]
	};
	return o;

}]);

myApp.controller('MainCtrl', [
	'$scope',
	//this injects posts service into the main controller
	'posts',

	function($scope, posts){
		//can only have two way data binding with $scope variables
		//this line mirrors the array returned by the service
		//this way, we can display the posts to the view
		$scope.posts = posts.posts;
		// the add posts function
		$scope.addPost = function(){
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Cool post!', upvotes: 0},
    				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				]
			})
		};
		$scope.addComment = function(){
			if($scope.body === '') { return; }
  			$scope.post.comments.push({
    			body: $scope.body,
    			author: 'user',
    			upvotes: 0
  		});
  			$scope.body = '';
		};
		$scope.incrementUpvotes = function(post){
			// increment that post's upvotes by 1
			post.upvotes += 1;
		};

}]);

myApp.controller('PostsCtrl', [
	'$scope',
	// inject our state params to make sure we are sending the params for the post
	'$stateParams',
	// inject the posts service into the posts controller
	'posts',
	function($scope, $stateParams, posts){
		// sets a scope object called post that grabs the appropriate post from 
		// from the posts service using $stateParams
		$scope.post = posts.posts[$stateParams.id];

}]);
