// models/property.model.js
const mongoose = require('mongoose');

const propertySchema = mongoose.Schema(
  {
    location: { type: String, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [{ type: String }],
    likedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    interestedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
