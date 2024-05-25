const express = require('express');

const { userController } = require('../../controllers');

const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/login').post(userController.logInUser);

module.exports = router;
