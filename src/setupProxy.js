const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.openai.com/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
