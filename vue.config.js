const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa:{
    iconPaths: {
      favicon32: 'img/fablogo.png',
      favicon16: 'img/fablogo.png',
      appleTouchIcon: 'images/logo.png',
      maskIcon: 'images/logo.png',
      msTileImage: 'images/logo.png',
    },
  }
});
