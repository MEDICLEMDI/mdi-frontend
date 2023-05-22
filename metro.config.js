/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig } = require('metro-config');

module.exports = async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
        minifierConfig: {
          keep_classnames: true, // FIX typeorm
          keep_fnames: true, // FIX typeorm
          mangle: {
            // toplevel: false,
            keep_classnames: true, // FIX typeorm
            keep_fnames: true, // FIX typeorm
          },
          output: {
            ascii_only: true,
            quote_style: 3,
            wrap_iife: true,
          },
          sourceMap: {
            includeSources: false,
          },
          toplevel: false,
          compress: {
            // reduce_funcs inlines single-use functions, which cause perf regressions.
            reduce_funcs: false,
          },
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'svg', 'json'], //add here
    },
  };
};
