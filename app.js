// Angular allows for continuous updates. Model is single source of truth
// the user can update the view which updates the Model
// and the model and can update the view
// the view is simply an instant projection of your model

// here we call the application we declared in the html file
angular.module('flapperNews', [])
// this is a service 
// You may be wondering why we're using the keyword factory instead of service. 
// In angular, factory and service are related in that they are both instances of a third entity called provider.

// here is our main controller
.controller('MainCtrl', [
	'$scope',
	// the scope variable serves as a bridge between Angular controllers
	// and angular templates. If you want something to be accessible in the template
	// such as a function or variable, bind it to $scope
	function($scope){
		// declare the variable test in the controller
		// contents displayed on DOM with {{}} (two-way-data-bindings)
		$scope.test = 'Hello, World!';
		// display a list
		// new $scope var for posts
		// this will make use of ng-repeat in the DOM to display a list
		$scope.posts = [
		{title: 'post 1', upvotes: 5},
		{title: 'post 2', upvotes: 4},
		{title: 'post 3', upvotes: 3},
		{title: 'post 4', upvotes: 15},
		{title: 'post 5', upvotes: 2}
		];
		// add a function to $scope so that a user can input onto page a post
		// when this function is invoked, it will append a new post to the $scope.posts variable
		$scope.addPostSet = function(){
			$scope.posts.push({
				title: 'A new post!', upvotes: 0});
		};
		// now here is a function that takes user input and puts it into a post and displays on the page
		$scope.addPost = function(){
			// this line is to prevent the user from submitting a blank title
			// if scope title is undefined or is blank, do not submit
			if(!$scope.title || $scope.title === ''){return;}
			// call $scope.title (user input) and assign it to title
			$scope.posts.push({
				title: $scope.title,
				// do the same with link
				link: $scope.link,
				// and initially set upvotes to zero
				upvotes: 0
			});
			// clear $scope.title after it has been assigned
			$scope.title = ''
			// clear $scope.link after it has been assigned
			$scope.link = ''
		};
		// the incrementUpvotes function, pass in the post
		$scope.incrementUpvotes = function(post){
			// increment that post's upvotes by 1
			post.upvotes += 1;
		};

	}]);

