const { Schema, model, Types } = require('mongoose');

const messageSchema = new Schema(
  {
    sender: { type: Types.ObjectId, ref: 'User', required: true },
    conversation: { type: Types.ObjectId, ref: 'Conversation' },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Message = model('Message', messageSchema);

module.exports = Message;
