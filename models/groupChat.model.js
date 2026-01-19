const { Schema, model, Types } = require('mongoose');

const groupChatSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [
      {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    admin: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const GroupChat = model('GroupChat', groupChatSchema);

module.exports = GroupChat;
