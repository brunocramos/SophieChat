'use strict';

/**
 * Module dependencies.
 */
var chatRoomPolicy = require('../policies/chatroom.server.policy'),
  chatRoom = require('../controllers/chatRoom.server.controller'),
  chatMessage = require('../controllers/chatmessage.server.controller');

module.exports = function (app) {
  // Chat collection routes
  app.route('/api/chat').all(chatRoomPolicy.isAllowed)
    .get(chatRoom.list)
    .post(chatRoom.create);

  // Single chat routes
  app.route('/api/chat/:chatRoomId').all(chatRoomPolicy.isAllowed)
    .get(chatRoom.read)
    .put(chatRoom.update)
    .delete(chatRoom.delete);

  // Chat history
  app.route('/api/chat-history/:chatRoomId').all(chatRoomPolicy.isAllowed)
    .get(chatMessage.list);

  // Finish by binding the chat middleware
  app.param('chatRoomId', chatRoom.chatRoomByID);
};
