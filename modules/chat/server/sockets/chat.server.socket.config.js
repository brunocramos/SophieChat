'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  ChatMessage = mongoose.model('ChatMessage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// Create chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  socket.on('userJoined', function(chatRoomId) {
    socket.room = chatRoomId;
    socket.join(chatRoomId);

    socket.broadcast.to(chatRoomId).emit('chatMessage', {
      type: 'status',
      action: 'joined',
      text: 'Is now connected',
      created: Date.now(),
      profileImageURL: socket.request.user.profileImageURL,
      user: socket.request.user
    });
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    var newMessage = new ChatMessage();

    newMessage.chatroom = socket.room;
    newMessage.message = message.text;
    newMessage.user = socket.request.user;

    newMessage.save(function (err) {
      if (!err) {
        message.type = 'message';
        message.created = Date.now();
        message.user = socket.request.user;

        // Emit the 'chatMessage' event
        io.sockets.in(socket.room).emit('chatMessage', message);
      } else {
        // I can handle the error here in many ways, such as
        // sending the user a notification, logging, etc..
      }
    });
  });

  // Emit the status event when a socket client is disconnected
  socket.on('userLeft', function () {
    io.sockets.in(socket.room).emit('chatMessage', {
      type: 'status',
      action: 'left',
      text: 'disconnected',
      created: Date.now(),
      user: socket.request.user
    });
    socket.leave(socket.room);
  });
};
