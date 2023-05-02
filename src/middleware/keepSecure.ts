const rateLimit = require('express-rate-limit');
const ipBlock = require('express-ip-block');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
  message: 'Too many requests from this IP, please try again later'
});

const blockedIps = ['1.2.3.4', '5.6.7.8']; // list of known malicious IPs

const blockMaliciousIps = ipBlock({
  ips: blockedIps
});

const middleware = [limiter, blockMaliciousIps];

module.exports = middleware;
