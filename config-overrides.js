const path = require("path");
const {
  override,
  addBabelPlugins,
  babelInclude,
  addWebpackModuleRule,
  addWebpackAlias,
  addTslintLoader,
} = require("customize-cra");

module.exports = override(
  ...addBabelPlugins("@babel/plugin-proposal-class-properties"),
  babelInclude([
    path.resolve(__dirname, "node_modules/react-native-elements"),
    path.resolve(__dirname, "node_modules/react-native-vector-icons"),
    path.resolve(__dirname, "node_modules/react-native-ratings"),
    path.resolve(__dirname, "node_modules/react-native-material-ripple"),
    path.resolve(__dirname, "node_modules/react-native-toast-message"),
    path.resolve(__dirname, "node_modules/react-native-animatable"),
    path.resolve(__dirname, "node_modules/react-native-picker-select"),
    path.resolve(__dirname, "node_modules/@react-native-picker"),
    path.resolve(__dirname, "node_modules/react-native-progress"),
    path.resolve(__dirname, "node_modules/react-native-raw-bottom-sheet"),
    path.resolve(
      __dirname,
      "node_modules/@twotalltotems/react-native-otp-input"
    ),
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
    "@react-native-firebase/app": "firebase/app",
    "@react-native-firebase/auth": "firebase/auth",
    "lottie-react-native": "react-native-web-lottie",
    "react-native-progress": "rc-progress",
  })
);
