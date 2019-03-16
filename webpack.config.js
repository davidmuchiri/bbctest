const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
   mode: "production",
   entry: "./src/app.js",
   output: {
      path: path.join(__dirname, "dist"),
      filename: "app.bundle.js",
      publicPath: "/"
   },

   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            exclude: /node_modules/
         },
         {
            test: /\.s?[ac]ss$/,
            exclude: "/node_modules/",
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: { url: false, sourceMap: true }
               },
               {
                  loader: "sass-loader",
                  options: { sourceMap: true }
               }
            ]
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({ filename: "style.css" }),
      new MinifyPlugin(),
      new CompressionPlugin({
         algorithm: "gzip"
      })
   ],
   devServer: {
      contentBase: path.join(__dirname, "dist"),
      publicPath: "/",
      open: true,
      port: 3000,
      watchContentBase: true,
      historyApiFallback: true
   }
};
