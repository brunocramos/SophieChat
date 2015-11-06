'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  ChatRoom = mongoose.model('ChatRoom'),
  ChatMessage = mongoose.model('ChatMessage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of messages from a chat room
 */
exports.list = function (req, res) {
  var chatRoomId = new ObjectId(req.params.chatRoomId);

  // {'user' : 1, 'message' : 1, 'created' : 1}
  ChatMessage
    .find({chatroom: new ObjectId(chatRoomId)})
    .select('user message created')
    .sort('-created')
    .populate('user', 'displayName profileImageURL username')
    .exec(function (err, chatHistory) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(chatHistory);
      }
    });
};