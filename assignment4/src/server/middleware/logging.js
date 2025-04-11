import logger from '../utils/logger.js';

function logRequest(req, res, next) {
  const { method, path } = req;
  const currentTime = new Date().toISOString();

  logger.info(`[${currentTime}] ${method} ${path}`);

  next();
}

export function LoggingMiddleware(req, res, next) {
  logRequest(req, res, next);
}
