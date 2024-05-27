const httpStatus = require('http-status');
const { userService } = require('../services');
const mongoose = require('mongoose');

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(user);
};

const logInUser = async (req, res) => {
  const result = await userService.logInUser(req.body);
  try {
    if (result.status === httpStatus.SUCCESSFUL) {
      res.cookie('Authtokenrentify', result.data, {
        httpOnly: true,
      });
    }
    res.send(result);
  } catch (err) {
    res.send({
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
    console.error('Error fetching user:', error);
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
