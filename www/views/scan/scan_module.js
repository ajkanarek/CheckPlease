/* This view is nominalas to provide a controller for the barcode */
angular.module('views.scan', [])
.controller('scanCtrl', ['$scope', '$cordovaBarcodeScanner', function($scope, $cordovaBarcodeScanner) {
    /* Holds the restaurant data collected from the QR Code */
    var restaurant = {
        id: 0,
        table_id: 0,
        name: "",
        img: ""
    };

    $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if(data.format != "QR_CODE") { return; }
            if(data.text.length != 11) { return; }

            /* Barcode text is in the format #######:### (restaurant id:table id) */
            var temp = data.text.split(":");
            restaurant.id = parseInt(temp[0]);
            restaurant.table_id = parseInt(temp[1]);
        });
    };

    /* Start on the scan view */
    $scope.scan();

}]);