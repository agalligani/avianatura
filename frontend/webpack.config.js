const path = require("path")

module.exports={
  /** "mode"
   * the environment - development, production, none. tells webpack 
   * to use its built-in optimizations accordingly. default is production 
   */
  mode: "development", 
  entry: "./index.js",
  output: {
      path: path.resolve(__dirname, "public"),
      filename: "main.js",
      publicPath: "/"
  },
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is 
   * for browser (client side). Default is "web"
   */
  target: "web",
  devtool: "inline-source-map",
  devServer: {
      port: "9500",
      static: ["./public"],
      open: true,
      hot: true,
      liveReload: true,
      /** this next line is important for react-router-dom */
      historyApiFallback: true
  },
  resolve: {
      extensions: ['.js','.jsx','.json'] 
  },
  module:{
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use:  'babel-loader'
          },
          {
              test: /\.(css)$/,
              use: ['style-loader','css-loader']
          },
          {
              test: /\.s[ac]ss$/i,
              use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
              ],
            }
      ]
  }
}