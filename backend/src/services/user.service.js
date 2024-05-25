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
    const isPasswordMatch = await user.isPasswordMatch(userData.password); // Await password check if it's an async function
    if (isPasswordMatch) {
      const token = await user.generateAuthToken(); // Ensure this function is correctly implemented
      console.log('User login info is correct and token with user is', token, user);
      return {
        message: 'User logged in',
        status: httpStatus.OK, // Use OK status for successful login
        data: {
          token,
          user,
        },
      };
    }
    return {
      message: 'Incorrect password',
      status: httpStatus.UNAUTHORIZED,
      data: {},
    };
  }
  return {
    message: 'User does not exist',
    status: httpStatus.NOT_FOUND, // Use NOT_FOUND status for non-existing user
    data: {},
  };
};

module.exports = {
  createUser,
  logInUser,
};
