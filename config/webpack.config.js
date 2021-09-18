import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const env = Object.entries(process.env)
  .filter(([k, v], i) => {
    return k.indexOf("TWITTER_") > -1;
  })
  .reduce((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {});

const __dirname = path.resolve();

const config = {
  mode: "development",
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  entry: ["./src/index.tsx"],
  output: {
    filename: "main.js?v=[contenthash]",
    path: __dirname + "/build",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["last 2 chrome versions"],
                },
              },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ "process.env": JSON.stringify(env) }),
  ],
};

export default config;
