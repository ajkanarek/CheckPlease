/* This view is nominalas to provide a controller for the barcode */
angular.module('views.scan', ['ngCordova', 'restaurants'])
.controller('scanCtrl', ['$scope', '$cordovaBarcodeScanner', '$state', 'restaurants', function($scope, $cordovaBarcodeScanner, $state, restaurants) {
    /* Holds the restaurant data collected from the QR Code */
    $scope.restaurant = {
        id: 0,
        table_id: 0,
        name: "Restaurant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        img: ""
    };

    $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if(data.format != "QR_CODE") { return; }
            if(data.text.length != 11) { return; }

            /* Barcode text is in the format #######:### (restaurant id:table id) */
            var temp = data.text.split(":");
            $scope.restaurant.id = parseInt(temp[0]);

            /* Look the restaurant up, and set it to controllers variable */
            restaurants.lookup($scope.restaurant.id).then(function(restaurant) {
                if(restaurant) 
                { 
                    $scope.restaurant = restaurant;
                    $scope.restaurant.table_id = parseInt(temp[1]);
                }
            });
        });
    };

    /* Goes to the main tab page */
    $scope.goToTab = function() {
        console.log('clicked go button');
        $state.go('');
    };

    /* Start on the scan view */
    $scope.scan();

}]);