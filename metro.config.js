const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// 1. Get default config
const config = getDefaultConfig(__dirname);

// 2. Add crypto fallback for Node modules
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  crypto: path.resolve(__dirname, "node_modules/react-native-crypto"),
};

// 3. Now wrap it with NativeWind
module.exports = withNativeWind(config, {
  input: './global.css', // your NativeWind input
});
