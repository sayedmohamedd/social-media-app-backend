const { Schema, model, Types } = require('mongoose');

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessage: { type: Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

conversationSchema.pre(/^find/, function (next) {
  this.populate(
    'members',
    '-email -role -cover -__v -bio -birthdate -updatedAt -createdAt'
  );
  next();
});

conversationSchema.pre(/^find/, function (next) {
  this.populate('lastMessage');
  next();
});

const Conversation = model('Conversation', conversationSchema);

module.exports = Conversation;
