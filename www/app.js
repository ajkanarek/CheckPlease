angular.module('checkplease', ['ionic', 'ngCordova', 'auth', 'socket', 'views'])
.run(['$ionicPlatform', '$cordovaSplashscreen', '$state', 'auth', function($ionicPlatform, $cordovaSplashscreen, $state, auth) {
    $ionicPlatform.ready(function() {
        auth.validateToken().then(function() { /* Token is still valid */
            console.log('valid token');
            /* Go to dashboard, close splashscreen */
            $state.go('dashboard');
            $cordovaSplashscreen.hide();
        }, function() { /* Token is invalid */
            console.log('invalid token');
            /* Go to login, close splashscreen */
            $state.go('login');
            $cordovaSplashscreen.hide();
        });
    });
}])
.config(function() {
    /* Stubbed out for now */
})
.controller('appCtrl', function () {
    /* Stubbed out. Don't put things here. */
})