const httpStatus = require('http-status');
const { userService } = require('../services');

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
module.exports = {
  createUser,
  logInUser,
};
