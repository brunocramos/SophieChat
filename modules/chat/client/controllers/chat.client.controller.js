'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Socket', 'ChatRoom', '$stateParams', '$filter', 'ChatMessage',
  function ($scope, $location, Authentication, Socket, ChatRoom, $stateParams, $filter, ChatMessage) {
    // Create a messages array
    $scope.messages = [];

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
      $location.path('/');
    }

    ////////////////// Scope methods

    $scope.iJoined = function() {
      Socket.emit('userJoined', $stateParams.chatRoomId);

      // Get history
      var history = ChatMessage.query({ 'chatRoomId' : $stateParams.chatRoomId });

      history.$promise.then(function(data) {
        angular.forEach(data, function (item) {
          $scope.messages.push({
            type : 'message',
            text : item.message,
            created : item.created,
            user : item.user
          });
        });
      });
    };

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      var message = {
        text: this.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      this.messageText = '';
    };

    // Find existing Chat Room
    $scope.findOne = function () {
      $scope.chatRoom = ChatRoom.get({
        chatRoomId: $stateParams.chatRoomId
      });
    };

    ////////////////// Socket methods
    
    // Make sure the Socket is connected
    if (!Socket.socket)
      Socket.connect();
    else
      // Tell the server to add this user to this room
      $scope.iJoined();
      

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      $scope.messages.push(message);
    });

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.emit('userLeft', $stateParams.chatRoomId);
      Socket.removeListener('chatMessage');
      Socket.removeListener('connect');
    });
  }
]);
