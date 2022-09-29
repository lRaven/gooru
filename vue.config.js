const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`,
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap( args => {
      args[0].title = 'Gooru';
      return args;
    })
    
  },
})
