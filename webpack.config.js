const path = require('path');
module.exports = {
  entry: {
    // client: './src/client.js'
    bundle: './express-api-endpoint/src/bundle.js'
  },
  output: {
    path: path.resolve(__dirname, 'express-api-endpoint/public'),
    // filename: "client.js"
    filename: "bundle.js"
  },
  module:{
    rules: [
        {
            test:/\.js$/,
            exclude:/node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.less$/,
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: "[local]"
                }
              },
              {
                loader: "less-loader"
              }
            ]
        }
    ]
}
}