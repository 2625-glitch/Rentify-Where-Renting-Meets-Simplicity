const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const User = require('./models/user.model');

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(async () => {
    try {
      logger.info('Connected to MongoDB');

      // await User.updateMany({}, { $set: { userType: 'seller' } });
      // logger.info('Updated existing properties to include default role');

      server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
      });
    } catch (error) {
      logger.error('Error during property update:', error);
      process.exit(1);
    }
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
