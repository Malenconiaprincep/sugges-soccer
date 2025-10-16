module.exports = {
  // Strapi Cloud 配置
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 1337,
  app: {
    keys: process.env.APP_KEYS?.split(','),
  },
  webhooks: {
    populateRelations: false,
  },
};
