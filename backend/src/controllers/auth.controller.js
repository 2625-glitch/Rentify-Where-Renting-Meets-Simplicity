const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { jwtsecret } = require('../config/config');
const { User } = require('../models');

const checkLoggedIn = async (req, res) => {
  const { token } = req.body;

  try {
    if (jwt.verify(token, jwtsecret)) {
      const user = jwt.verify(token, jwtsecret);
      const result = await User.findById(user._id);
      res.send({
        message: 'User loggedin',
        status: httpStatus.SUCCESSFUL,
        data: result,
      });
    }
  } catch (error) {
    res.send({
      message: 'User not loggedin',
      status: httpStatus.INTERNAL_SERVER_ERROR,
      data: false,
    });
  }
};
const logOut = async (req, res) => {
  res
    .cookie('Authtokenrentify', '', {
      expires: new Date(0),
      httpOnly: true,
    })
    .send();
};
module.exports = {
  checkLoggedIn,
  logOut,
};
