const boom = require('@hapi/boom');
const config = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === '79823') {
    next();
  } else {
    console.log(config.apikey);
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey };
