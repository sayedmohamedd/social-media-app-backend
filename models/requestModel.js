const { model, Schema, Types } = require('mongoose');

const requestSchema = new Schema(
  {
    from: { type: Types.ObjectId, ref: 'User', required: true },
    to: { type: Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

requestSchema.index({ from: 1, to: 1 }, { unique: true });

const Request = model('Request', requestSchema);

module.exports = Request;
