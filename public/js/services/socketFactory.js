app.factory('socket', ['$rootScope', function ($rootScope) {


  var safeApply = function(scope, fn) {
      if (scope.$$phase) {
        fn(); // digest already in progress, just run the function
      } else {
        scope.$apply(fn); // no digest in progress, run with $apply
      }
    };
    // var socket = io.connect();

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
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      },
      disconnect: function () {
        socket.disconnect();
      },
      socket: socket
    };

  }]);