module.exports = {
  "productionSourceMap": false,
  "filenameHashing": false,
  "publicPath": process.env.NODE_ENV === 'production'
    ? ''
    : '/'
  // configureWebpack: {
  //   devtool: 'source-map'
  // }

}