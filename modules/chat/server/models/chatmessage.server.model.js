'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ChatMessageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  chatroom: {
    type: Schema.ObjectId,
    ref: 'ChatRoom'
  },
  message: {
    type: String,
    default: '',
    trim: true,
    required: 'Message cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('ChatMessage', ChatMessageSchema);
