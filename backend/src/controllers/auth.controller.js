const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { jwtsecretkey } = require('../config/config');

const checkLoggedIn = async (req, res) => {
  const token = req.cookies.Authtokenrentify;

  try {
    if (!token) {
      res.send({
        message: 'User not loggedin',
        status: httpStatus.SUCCESSFUL,
        data: false,
      });
    } else {
      jwt.verify(token, jwtsecretkey);
      res.send({
        message: 'User loggedin',
        status: httpStatus.SUCCESSFUL,
        data: true,
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
