import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
