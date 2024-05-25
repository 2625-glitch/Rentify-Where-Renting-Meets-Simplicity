const httpStatus = require('http-status');
const { User } = require('../models');

const createUser = async (userData) => {
  if (await User.isEmailTaken(userData.email)) {
    return {
      message: 'User already exist',
      status: httpStatus.BAD_REQUEST,
      data: {},
    };
  }
  User.create(userData);
  console.log('user data added is', userData);
  return {
    message: 'User created',
    status: httpStatus.SUCCESSFUL,
    data: userData,
  };
};
const logInUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (user) {
    const password = user.isPasswordMatch(userData.password);
    if (password) {
      const token = await user.generateAuthToken();
      console.log('user logi info is correct and token is', token);
      return {
        message: 'User logged in',
        status: httpStatus.SUCCESSFUL,
        data: token,
      };
    }
    return {
      message: 'Incorrect Password',
      status: httpStatus.UNAUTHORIZED,
      data: {},
    };
  }
  return {
    message: 'User doesnt exist',
    status: httpStatus.BAD_REQUEST,
    data: {},
  };
};

module.exports = {
  createUser,
  logInUser,
};
