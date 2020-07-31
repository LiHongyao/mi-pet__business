const { override, fixBabelImports, addPostcssPlugins } = require('customize-cra');

module.exports = override(
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