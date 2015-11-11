/* This view is nominalas to provide a controller for the barcode */
angular.module('views.bill', ['ngCordova', 'restaurants'])
.controller('billCtrl', ['$scope', '$stateParams', 'restaurants', function($scope, $stateParams, restaurants) {
    $scope.restaurant = {
        id: 0,
        table_id: 0,
        name: "",
        description: "",
        img: ""
    };


    var restaurant_id = $stateParams.restaurant_id;
    console.log(restaurant_id);

    /* Load the restaurant the patron is dining at */
    restaurants.lookup(restaurant_id).then(function(restaurant) {
        $scope.restaurant = restaurant;
        console.log($scope.restaurant);
    });

}])
/* Sets the background of the header to a blurred version of the restaurants image */
.directive('billBackgroundImg', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            img_url: '&billBackgroundImg'
        },
        link: function(scope, elem, attrs) {

            function setImage() {
                if(scope.img_url() && scope.img_url.length)
                {
                    document.styleSheets[0].addRule('#bill #'+attrs.id + ':before', "background-image: url('" + scope.img_url() + "')!important");
                }
            };

            /* Call it once */
            $timeout(setImage);

            /* Watch for changes */
            scope.$watch(function() { return scope.img_url(); }, setImage);
        }
    }
});