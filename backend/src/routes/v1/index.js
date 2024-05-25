const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const propertyRoute = require('./property.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/property',
    route: propertyRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
