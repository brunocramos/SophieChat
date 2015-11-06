'use strict';

// ChatRoom service used for communicating with the chat REST endpoints
angular.module('chat').factory('ChatRoom', ['$resource',
  function ($resource) {
    return $resource('api/chat/:chatRoomId', {
      chatRoomId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

// ChatMessage service used for communicating with the chat REST endpoints
angular.module('chat').factory('ChatMessage', ['$resource',
  function ($resource) {
    return $resource('api/chat-history/:chatRoomId', {
      chatRoomId: ''
    });
  }
]);