// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'views', 'angular-stripe'])
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'views'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  //STRIPE CONFIGURATION
  //sets stripe puplishable key
  //stripeProvider.setPublishableKey('my_key');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/register/register.html',
    controller: 'RegisterCtrl'
  })

  .state('restaurants', {
    url: '/restaurants',
    templateUrl: 'views/restaurants/restaurants.html',
    controller: 'RestaurantsCtrl'
  })  

  .state('tip', {
    url: '/tip',
    templateUrl: 'views/tip/tip.html',
    controller: 'TipCtrl'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'DashCtrl'
  })

  .state('orders', {
    url: '/orders',
    templateUrl: 'views/orders/orders.html',
    controller: 'OrdersCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'views/profile/profile.html',
    controller: 'ProfileCtrl'
  })
      // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});