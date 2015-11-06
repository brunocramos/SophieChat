'use strict';

// ChatRoom controller
angular.module('chat').controller('ChatRoomController', ['$scope', '$stateParams', '$location', 'Authentication', 'ChatRoom',
  function ($scope, $stateParams, $location, Authentication, ChatRoom) {
    $scope.authentication = Authentication;

    // Create new Chat Room
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'chatRoomForm');

        return false;
      }

      // Create new chat room object
      var chatRoom = new ChatRoom({
        title: this.title
      });

      // Redirect after save
      chatRoom.$save(function (response) {
        $location.path('chat/' + response._id);

        // Clear form fields
        $scope.title = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing chat room
    $scope.remove = function (chatRoom) {
      if (chatRoom) {
        chatRoom.$remove();

        for (var i in $scope.chatRooms) {
          if ($scope.chatRooms[i] === chatRoom) {
            $scope.chatRooms.splice(i, 1);
          }
        }
      } else {
        $scope.chatRoom.$remove(function () {
          $location.path('chat');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'chatRoomForm');

        return false;
      }

      var chatRoom = $scope.chatRoom;

      chatRoom.$update(function () {
        $location.path('chat/' + chatRoom._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of ChatRoom
    $scope.find = function () {
      $scope.chatRooms = ChatRoom.query();
    };
  }
]);
