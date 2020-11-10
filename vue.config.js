const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/variable.scss";',
      },
    },
    extract: false,
  },

  //从@vue/cli-service/lib/config/prod.js拷贝,进行自定义
  chainWebpack: webpackConfig => {
    if (process.env.NODE_ENV === 'production') {
      const Version = new Date().getTime()
      const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
      const getAssetPath = require('./src/libs/vueUtils/getAssetPath')
      const filename = getAssetPath({}, `js/[name]${isLegacyBundle ? `-legacy` : ``}${'.[contenthash:8]'}-${Version}.js`)

      webpackConfig.mode('production').devtool(false).output.filename(filename).chunkFilename(filename)

      //自动切换cdn.html模板
      webpackConfig
        .mode('production')
        .plugin('html')
        .tap(args => {
          args[0].template = resolve('/public/index.cdn.html')
          return args
        })
    }

    //eslint自动格式化
    webpackConfig.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })

    //不复制index.cdn.html
    webpackConfig.plugins.has('copy') &&
      webpackConfig
        .mode('production')
        .plugin('copy')
        .tap(args => {
          if (args && args[0] && args[0][0]) args[0][0].ignore.push('index.cdn.html')
          return args
        })
  },

  configureWebpack: config => {
    config.performance = {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      },
    }
    if (process.env.NODE_ENV === 'production') {
      // config.plugins.push(new BundleAnalyzerPlugin())

      // config.plugins.push(new SpeedMeasurePlugin())

      config.entry = {
        app: ['./src/main.cdn.ts'],
      }
      //  key是 import 的包名，value 是CDN提供的全局变量名
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        lodash: '_',
        'element-ui': 'ELEMENT',
        axios: 'axios',
        // highcharts: 'Highcharts',
        echarts: 'echarts',
        // 'v-charts': 'VeIndex',
        sortablejs: 'Sortable',
      }

      //去除console
      let terserOptionsCompress = config.optimization.minimizer[0].options.terserOptions.compress
      terserOptionsCompress.drop_console = true
      terserOptionsCompress.drop_debugger = true
      terserOptionsCompress.pure_funcs = ['console.log']
    } else {
      config.plugins.push(
        new HardSourceWebpackPlugin({
          cacheDirectory: '../.cache/hard-source/[confighash]',
        }),
      )
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'zh-CN',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },

  // https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    open: /^win/.test(process.platform) ? 'chrome' : 'Google Chrome',
    proxy: {
      // '/': { target: 'http://api.iot.htdadao.net', changeOrigin: true, ws: false },
      // '/': { target: 'http://172.16.25.198:8089', changeOrigin: true, ws: false },
      // '/': { target: 'http://192.168.101.27:8081', changeOrigin: true, ws: false },
      // '/': { target: 'http://api.iot.htczyun.com', changeOrigin: true, ws: false },
      // '/': { target: 'https://api.iot.htczyun.com', changeOrigin: true, ws: false },
      '/': { target: 'https://api.123321yun.com', changeOrigin: true, ws: false },
    },
  },
}
