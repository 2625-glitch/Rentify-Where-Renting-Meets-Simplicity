const httpStatus = require('http-status');
const { User } = require('../models');

const createUser = async (userData) => {
  console.log('user data recvieved during signup in service is', userData);
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
    const isPasswordMatch = await user.isPasswordMatch(userData.password);
    if (isPasswordMatch) {
      const token = await user.generateAuthToken();
      console.log('User login info is correct and token with user is', token, user);
      return {
        message: 'User logged in',
        status: httpStatus.OK,
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
    status: httpStatus.NOT_FOUND,
    data: {},
  };
};

const fetchUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
        data: {},
      };
    }
    const { firstname, lastname, ...userData } = user.toObject();
    return {
      message: 'User found',
      status: httpStatus.OK,
      data: {
        firstname,
        lastname,
        ...userData,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      message: 'Internal server error',
      status: httpStatus.INTERNAL_SERVER_ERROR,
      data: {},
    };
  }
};

module.exports = {
  createUser,
  logInUser,
  fetchUser,
};
