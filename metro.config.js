// Metro config: Expo defaults + react-native-svg-transformer so .svg files
// can be imported as React components. The /expo subpath is the official
// recipe — it wraps Expo's transformer chain instead of replacing it,
// so TypeScript / Hermes / NativeWind (if added later) keep working.

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

module.exports = config;
