const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	productionSourceMap: false,

	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].metaYandexVerif = process.env.VUE_APP_META_YANDEX_VERIFICATION;
			args[0].yandexMetrica = process.env.VUE_APP_META_YANDEX_METRICA;
			return args;
		})
	}
})
