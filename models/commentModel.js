const { model, Schema, Types } = require('mongoose');

const commentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    post: { type: Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    likes: [
      {
        type: Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-cover -email -role -createdAt -updatedAt -__v',
  }); // Populate user
  next();
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
