const { model, Schema, Types } = require('mongoose');

const likeSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    target: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'targetModel',
    },
    targetModel: { type: String, required: true, enum: ['Post', 'Comment'] },
    // post: { type: Types.ObjectId, ref: 'Post' },
    // comment: { type: Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Populate user
likeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-cover -email -role -createdAt -updatedAt -__v',
  });
  next();
});

const Like = model('Like', likeSchema);

module.exports = Like;
