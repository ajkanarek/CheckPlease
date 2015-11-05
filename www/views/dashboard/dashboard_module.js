angular.module('views.dashboard', [])

.controller('DashCtrl', ['$scope', '$cordovaBarcodeScanner', function($scope, $cordovaBarcodeScanner) {

  var restaurant = {
    id: '',
    table_id: ''
  };

  var startScan = function() {

    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        // Success! Barcode data is here
        // barcode is 10 digit number
        if (barcodeData.length != 10) {
          console.error("barcode data is not required length! (10 characters)");
        }
        // first 8 characters are restaurant id
        $scope.restaurant.id = barcodeData.substring(0, 8);
        //last two digits represent table id
        $scope.restaurant.table_id = barcodeData.substring(8, 10);
      }, function(error) {
        // An error occurred
        console.error("There was an error scanning barcode. " + error);
      });

  }; // scanBarcode()

}]) // controller