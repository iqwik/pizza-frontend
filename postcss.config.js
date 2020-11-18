/* eslint-disable */
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({ preset: ['default', { discardComments: { removeAll: true } }] }),
        require('postcss-flexbugs-fixes'),
        require('postcss-import'),
        require('postcss-modules-values'),
        require('postcss-preset-env')({ browsers: 'last 2 versions' }),
    ],
}
