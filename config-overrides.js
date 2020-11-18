const { 
  override, 
  fixBabelImports, 
  addPostcssPlugins, 
  addWebpackAlias 
} = require('customize-cra');

module.exports = override(
  // 增加路径别名处理
  addWebpackAlias({
    ['@']: require('path').resolve(__dirname, 'src/'),
    ['@components']: require('path').resolve(__dirname, 'src/components/')
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }),
  addPostcssPlugins([
    require('postcss-pxtorem')({
      rootValue: 37.5,
      propList: ['*']
    })
  ])
);