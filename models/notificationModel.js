const { Schema, model, Types } = require('mongoose');

const notificationSchema = new Schema(
  {
    creator: { type: Types.ObjectId, ref: 'User' },
    user: { type: Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: [
        'friend_request',
        'like',
        'comment',
        'share',
        'story_view',
        'message',
      ],
      required: true,
    },
    referenceId: { type: Types.ObjectId }, // Could refer to the post, comment, etc.
    referenceType: {
      // New field to specify the type of reference
      type: String,
      enum: ['Post', 'Comment', 'Message', 'Story'], // Add more as needed
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.pre(/^find/, function (next) {
  this.populate('creator');
  next();
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
