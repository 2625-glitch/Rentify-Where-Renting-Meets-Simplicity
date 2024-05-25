// services/property.service.js
const Property = require('../models/property.model');
const mongoose = require('mongoose');

const createProperty = async (propertyData) => {
  console.log('came to cservice', propertyData);
  const property = await Property.create(propertyData);
  return property;
};

const getAllProperties = async () => {
  return Property.find();
};

const getPropertyById = async (propertyId) => {
  return Property.findById(propertyId);
};
const getPropertiesByUserId = async (userId) => {
  console.log('user id in service', userId);
  return Property.find({ userId });
};

const updateProperty = async (propertyId, updateData) => {
  return Property.findByIdAndUpdate(propertyId, updateData, { new: true });
};

const deleteProperty = async (propertyId) => {
  return Property.findByIdAndDelete(propertyId);
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesByUserId,
};
