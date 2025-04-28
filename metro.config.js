const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

// Get the default config
const config = getDefaultConfig(__dirname);

// Add nativewind config
module.exports = withNativeWind(config, {
  input: './global.css', // Your global CSS file
  resolver: {
    extraNodeModules: {
      crypto: path.resolve(__dirname, 'node_modules/react-native-crypto'),
    },
  },
});
