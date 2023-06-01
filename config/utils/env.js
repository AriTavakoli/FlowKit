// tiny wrapper with default env vars
module.exports = {
  NODE_ENV: 'production',
  BUNDLE_ANALYZER: true,
  PORT: process.env.PORT || 3000,
};
