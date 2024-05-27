// controllers/property.controller.js
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const propertyService = require('../services/property.service');

const createProperty = async (req, res) => {
  const property = await propertyService.createProperty(req.body);
  res.status(httpStatus.CREATED).send(property);
};

const getAllProperties = async (req, res) => {
  const properties = await propertyService.getAllProperties();
  res.send(properties);
};

const getPropertyById = async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.id);
  if (!property) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Property not found' });
  }
  res.send(property);
};

const getPropertiesByUserId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid user ID' });
  }

  try {
    const properties = await propertyService.getPropertiesByUserId(id);
    if (!properties || properties.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'No properties found for this user' });
    }
    res.send(properties);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error', error });
  }
};

const updateProperty = async (req, res) => {
  const property = await propertyService.updateProperty(req.params.id, req.body);
  if (!property) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Property not found' });
  }
  res.send(property);
};

const deleteProperty = async (req, res) => {
  try {
    const property = await propertyService.deleteProperty(req.params.id);
    if (!property) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Property not found' });
    }
    res.status(httpStatus.OK).send({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertiesByUserId,
};
