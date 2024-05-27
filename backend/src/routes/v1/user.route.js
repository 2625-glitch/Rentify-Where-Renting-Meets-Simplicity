const express = require('express');

const { userController } = require('../../controllers');

const router = express.Router();

router.route('/').post(userController.createUser);
router.route('/login').post(userController.logInUser);
router.route('/:id').get(userController.fetchUser);

module.exports = router;
