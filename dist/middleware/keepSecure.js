const rateLimit = require('express-rate-limit');
const ipBlock = require('express-ip-block');
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});
const blockedIps = ['1.2.3.4', '5.6.7.8']; // list of known malicious IPs
const blockMaliciousIps = ipBlock({
    ips: blockedIps
});
const middleware = [limiter, blockMaliciousIps];
module.exports = middleware;
//# sourceMappingURL=keepSecure.js.map