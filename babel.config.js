module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          // Core aliases:
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/constants': './src/constants',
          '@/hooks': './src/hooks',
          '@/interfaces': './src/interfaces',
          '@/modules': './src/modules',
          '@/navigation': './src/navigation',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/utils': './src/utils',
          // Usefull aliases:
          '@/buttons': './src/components/buttons',
          '@/commonComponents': './src/components/common',
          '@/formatters': './src/components/formatters',
          '@/icons': './src/components/icons',
          '@/layout': './src/components/layout/index',
          '@/store': './src/store/index',
          '@/tokens': './src/components/tokens',
        },
      },
    ],
  ],
};
