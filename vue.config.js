const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      favicon32: 'img/fablogo.png',
      favicon16: 'img/fablogo.png',
      appleTouchIcon: 'images/logo.png',
      maskIcon: 'images/logo.png',
      msTileImage: 'images/logo.png',
    },
    manifestOptions: {
      name: "Fabricator",
      short_name: "Fabricator",
      description: "Fabricator",
      start_url: "./",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      orientation: "portrait",
      "icons": [
        {
          "src": "img/fablogo.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "img/fablogo.png",
          "sizes": "96x96",
          "type": "image/png"
        } 
      ],  
    }, 
  }
});
