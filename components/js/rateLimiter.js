// lib/rateLimiter.js

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "You can only make 5 requests per 30 seconds. Please try again later.",
});

export function rateLimiter(handler) {
  return async (req, res) => {
    await new Promise((resolve, reject) => {
      limiter(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve(result);
      });
    });

    return handler(req, res);
  };
}
