'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  ChatRoom = mongoose.model('ChatRoom'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Chat Room
 */
exports.create = function (req, res) {
  var chatRoom = new ChatRoom(req.body);
  chatRoom.user = req.user;

  chatRoom.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(chatRoom);
    }
  });
};

/**
 * Show the current Chat Room
 */
exports.read = function (req, res) {
  res.json(req.chatRoom);
};

/**
 * Update a Chat Room
 */
exports.update = function (req, res) {
  var chatRoom = req.chatRoom;

  chatRoom.title = req.body.title;

  chatRoom.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(chatRoom);
    }
  });
};

/**
 * Delete an Chat Room
 */
exports.delete = function (req, res) {
  var chatRoom = req.chatRoom;

  chatRoom.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(chatRoom);
    }
  });
};

/**
 * List of Chat Rooms
 */
exports.list = function (req, res) {
  ChatRoom.find().sort('-Title').populate('user', 'displayName').exec(function (err, chatRoomList) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(chatRoomList);
    }
  });
};

/**
 * Chat Room middleware
 */
exports.chatRoomByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Invalid Chat Room'
    });
  }

  ChatRoom.findById(id).populate('user', 'displayName').exec(function (err, chatRoom) {
    if (err) {
      return next(err);
    } else if (!chatRoom) {
      return res.status(404).send({
        message: 'No chat room with that identifier has been found'
      });
    }
    req.chatRoom = chatRoom;
    next();
  });
};