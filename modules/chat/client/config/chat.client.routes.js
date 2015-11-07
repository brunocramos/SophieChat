'use strict';

// Configure the 'chat' module routes
angular.module('chat').config(['$stateProvider',
  function ($stateProvider) {
    // Chat state routing
    $stateProvider
      .state('chat', {
        abstract: true,
        url: '/chat',
        template: '<ui-view/>'
      })
      .state('chat.list', {
        url: '',
        templateUrl: 'modules/chat/client/views/list-chatroom.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('chat.create', {
        url: '/create',
        templateUrl: 'modules/chat/client/views/create-chatroom.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('chat.join', {
        url: '/:chatRoomId',
        templateUrl: 'modules/chat/client/views/chat-room.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('chat.edit', {
        url: '/:chatRoomId/edit',
        templateUrl: 'modules/chat/client/views/edit-chat.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
