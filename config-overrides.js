const path = require("path");
const {
  override,
  addBabelPlugins,
  babelInclude,
  addWebpackModuleRule,
  addWebpackAlias,
} = require("customize-cra");

module.exports = override(
  ...addBabelPlugins("@babel/plugin-proposal-class-properties"),
  babelInclude([
    path.resolve(__dirname, "node_modules/react-native-elements"),
    path.resolve(__dirname, "node_modules/react-native-vector-icons"),
    path.resolve(__dirname, "node_modules/react-native-ratings"),
    path.resolve(__dirname, "node_modules/react-native-material-ripple"),
    path.resolve(__dirname, "src"),
  ]),
  addWebpackModuleRule({
    test: /\.svg$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "@svgr/webpack",
      },
    ],
  }),
  addWebpackAlias({
    "react-native": "react-native-web",
  })
);
