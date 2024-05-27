const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(user);
};

const logInUser = async (req, res) => {
  try {
    const result = await userService.logInUser(req.body);
    if (result.status === httpStatus.OK) {
      res.cookie('Authtokenrentify', result.data.token, {
        httpOnly: true,
      });
      res.send(result);
    }
    res.status(result.status).send(result);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'Internal server error',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid user ID' });
    }
    const user = await userService.fetchUser(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
        data: null,
      });
    }

    res.status(httpStatus.OK).json({
      message: 'User found',
      status: httpStatus.OK,
      data: user,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      status: httpStatus.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

module.exports = {
  createUser,
  logInUser,
  fetchUser,
};
