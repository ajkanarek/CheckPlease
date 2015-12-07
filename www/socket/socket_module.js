angular.module('socket', ['socket.config'])
.factory('socket', ['$rootScope', 'socket_config', function($rootScope, socket_config) {
    /* Simple wrapper around socket.io library so that the rest of the
     * application is independent from the web socket implementation if it 
     * ever changes.
     */
    var socket = io.connect("http://162.243.48.9:1337/");

    return {
        on: function (eventName, callback) {

            socket.on(eventName, function () {  
                var args = arguments;
                
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) { callback.apply(socket, args); }
                });
            });
        }
    }; 
}]);