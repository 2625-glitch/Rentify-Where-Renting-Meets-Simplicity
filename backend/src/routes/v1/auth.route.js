const express = require('express');
const { authController } = require('../../controllers/index');

const router = express.Router();

router.route('/checkLogin').get(authController.checkLoggedIn);
router.route('/logout').post(authController.logOut);

module.exports = router;
