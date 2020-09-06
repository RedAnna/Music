// vue.config.js
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        'components': path.join(__dirname, 'src/components'),
        'router': path.join(__dirname, 'src/router'),
        'store': path.join(__dirname, 'src/store'),
        'views': path.join(__dirname, 'src/views'),
        'network': path.join(__dirname, 'src/network')
      },
    },
  },
};
