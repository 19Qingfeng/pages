const presetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    presetEnv({
      stage: 4,
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
