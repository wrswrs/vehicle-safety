module.exports = {
  presets: ['@vue/app', '@babel/preset-typescript'],
  plugins: [
    // [
    //   'component',
    //   {
    //     libraryName: 'element-ui',
    //     styleLibraryName: 'theme-chalk'
    //   }
    // ],
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ],
}
