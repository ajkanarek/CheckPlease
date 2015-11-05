angular.module('views.register', ['auth'])

// Register Controller
.controller('RegisterCtrl', ['$scope', 'auth', '$timeout', '$location', function($scope, auth, $timeout, $location) {
	/* User login credentials */
	$scope.user = {
		email: "",
		password: "",
		card: {
			company: "",
			number: "",
			name: "",
			cvc: "",
			month_exp: "",
			year_exp: ""
		}
	};

	$scope.counter = 0;
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }

	/* Helpful error message */
	$scope.error = "";

	$scope.register = function() {
		/* Don't allow multiple requests */
		if($scope.registering) { return; }

		var user = $scope.user;
		console.log(user);

		/* Check that fields are not empty */
		//if(user.username.length == 0) { $scope.error = "Please enter a username"; return; }
		if(user.email.length == 0) { $scope.error = "Please enter an email"; console.error($scope.error); return; }
		else if(user.password.length == 0) { $scope.error = "Please enter a password"; console.error($scope.error); return; }
		
		$scope.registering = true;
		/* Hide the keyboard so the user can see the loading sigl or error message */
		//cordova.plugins.Keyboard.close();  --> error because cordova is not defined at this point...

		/* Clear any old errors and send the user data */
		$scope.error = "";

		//handles stripe validation before email and password are verified
/*
		Stripe.card.validateCardNumber(user.card.number);
		Stripe.card.validateCVC(user.card.cvc);
		Stripe.card.validateExpiry(user.card.month_exp);
		Stripe.card.validateExpiry(user.card.year_exp);
		
		if (card.company != Stripe.card.cardType(user.card.number)) {
			console.error("Invalid card number. Card types do not match")
		}
		
		Stripe.card.createToken({
		  number: user.card.number.val(),
		  cvc: user.card.cvc.val(),
		  exp_month: user.card.month_exp.val(),
		  exp_year: user.card.year_exp.val()
		}, stripeResponseHandler);
*/

		/* */
		auth.register(user).then(function() { /* Success */
			console.log('Registered in successfully');
			$scope.registering = false;
			$location.path('/dashboard');
		}, function(error) { /* Failure */
			console.log('Failed to register in');
			$scope.error = error;
			$scope.registering = false;
		});
	};
}])