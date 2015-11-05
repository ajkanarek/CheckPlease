angular.module('views.login', ['auth'])

// Login Controller
.controller('LoginCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth) {
	/* User login credentials */
	
	$scope.user = {
		email: "",
		password: ""
	};

	/* Helpful error message */
	$scope.error = "";

	$scope.validate = function() {
		/* Don't allow multiple requests */
		if($scope.logging_in) { return; }

		var user = $scope.user;
		
		console.log(user);

		/* Check that fields are not empty */
		if(user.email.length == 0) { $scope.error = "Please enter a username"; return; }
		else if(user.password.length == 0) { $scope.error = "Please enter a password"; return; }

		$scope.logging_in = true;
		/* Hide the keyboard so the user can see the loading sigl or error message */
		// cordova.plugins.Keyboard.close(); //Error on this line --> cordova not defined

		/* Clear any old errors and send the user data */
		$scope.error = "";

		/* */
		auth.login(user).then(function() { /* Success */
			console.log('Logged in successfully');
			$scope.logging_in = false;
			$state.go('dashboard');
		}, function(error) { /* Failure */
			console.log('Failed to log in');
			$scope.error = error;
			$scope.logging_in = false;
		});
	};
}])