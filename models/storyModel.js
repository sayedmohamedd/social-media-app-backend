const { model, Schema, Types } = require('mongoose');

const storySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['text', 'image'], default: 'text' },
    background: String,
    image: String,
    text: String,
    expiresIn: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 24 * 60 * 60 * 1000);
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

storySchema.pre('validate', function (next) {
  if (!this.img && !this.text) {
    this.invalidate('text', 'Story must have at least an image or text');
  }
  next();
});

// populate user
storySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-email -role -createdAt -birthdate -bio -__v',
  });
  next();
});

storySchema.index({ user: 1, expiresIn: 1 });

const Story = model('Story', storySchema);

module.exports = Story;
