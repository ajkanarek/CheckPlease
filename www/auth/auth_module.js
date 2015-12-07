/* Responsible for logging a user in and sending/refreshing auth tokens */
angular.module('auth', ['socket', 'auth.config'])
.factory('auth', ['$rootScope', '$state', '$q', '$timeout', 'socket', 'auth_config', function($rootScope, $state, $q, $timeout, socket, auth_config) {

	/* On connect see if we need to re-validate the user */
	socket.on('connect', function() {
		console.log('Connected!');
		var token = getToken();
		socket.emit('validate_token', token, function(error, data) {
			if(error) { console.log(error); }
			else
			{
				console.log("Token");
				setToken(data);
			}
		});
	});

	/* Saves a token to local storage */
	function setToken(token) 
	{
		if(token === null) { window.localStorage.removeItem("auth_token"); }
		else { localStorage.setItem("auth_token", token); }
	}

	/* Retrieves a token from local storage, return null if no token */
	function getToken()
	{
		return localStorage.getItem("auth_token");
	}

	function loginUser(user)
	{
		var deferred = $q.defer();

		$timeout(function() {
			deferred.reject({code: 2, mssg: "Connection timed out."});
		}, auth_config.timeout);

		socket.emit('login', user, function(error, token) {
			if(error)
			{
				console.log("There was an error");
				console.error('Error logging in: ' + error);
				deferred.reject(error);
			}
			else { console.log(token); setToken(token); console.log(getToken()); deferred.resolve(); }
		});
		return deferred.promise;
	}

	function registerUser(user)
	{
		console.log("REGISTERING");
		console.log(user);

		var deferred = $q.defer();

		$timeout(function() {
			deferred.reject({code: 2, mssg: "Connection timed out."});
		}, auth_config.timeout);

		socket.emit('register', user, function(error, token) {
			if(error)
			{
				console.error('Error registering user: ' + error);
				deferred.reject(error);
			}
			else { console.log("token"); setToken(token); deferred.resolve(); }
		});

		return deferred.promise;
	}

	/* Checks that the local token is still valid. Sends the user to the
	 * login page if the token isn't valid.
	 */
	function validateToken()
	{
		var deferred = $q.defer();

		var token = getToken();
		if(!token) { deferred.reject(); return deferred.promise; }

		$timeout(function() {
			deferred.reject({code: 2, mssg: "Connection timed out."});
		}, auth_config.timeout);

		socket.emit('validate_token', token, function(error, data) {
			if(error)
			{
				console.log('Token no longer valid');
				deferred.reject();
			}
			deferred.resolve();
		});

		return deferred.promise;
	}

	function logUserOut()
	{
		setToken(null);
		$state.go('login');
	}

    return {
    	login: function(user) {
    		return loginUser(user);
    	},
    	register: function(user) {
    		return registerUser(user);
    	},
    	logout: function() {
    		return logUserOut();
    	},
    	validateToken: function() {
    		return validateToken();
    	}
    };
}]);