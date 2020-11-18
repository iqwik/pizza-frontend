const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const localhost = 'http://pizza.loc'
const mainDir = __dirname
const assets = './assets/'
const prodPath = path.resolve(mainDir, assets)

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development'

    const babel = [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        },
    ]

    const rules = [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
            test: /\.s[ac]ss$/i,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: isDev,
                    },
                },
                'postcss-loader',
                'sass-loader',
                { loader: 'resolve-url-loader', options: { removeCR: true } },
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        context: prodPath,
                        name: 'img/[name].[ext]',
                        publicPath: assets,
                    },
                },
                'img-loader',
            ],
            type: 'javascript/auto', // disable webpack asset module
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    context: prodPath,
                    name: 'fonts/[name].[ext]',
                    publicPath: assets,
                },
            },
            type: 'javascript/auto', // disable webpack asset module
        },
    ]

    const plugins = [
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, '/index.php'),
            template: path.join(mainDir, 'src/template/index.html'),
            minify: !isDev,
            hash: !isDev,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ]

    const config = {
        context: mainDir,
        entry: {
            app: '/src/index.jsx',
        },
        output: {
            path: prodPath,
            filename: 'js/[name].js',
        },
        resolve: {
            modules: [__dirname, 'node_modules'],
            extensions: ['.js', '.jsx'],
        },
        module: { rules: [] },
        plugins,
        optimization: { minimize: !isDev },
    }

    if (isDev) {
        config.module.rules = [
            ...babel,
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                },
            },
            ...rules,
        ]
        config.plugins = [
            ...config.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new BrowserSyncPlugin({
                files: '**/*.php',
                proxy: localhost,
            }),
        ]
        config.watch = true
        config.devtool = 'inline-cheap-module-source-map'
        config.watchOptions = { ignored: ['node_modules/**'] }
    } else {
        config.module.rules = [...babel, ...rules]
        config.optimization = { splitChunks: { chunks: 'all' } }
    }

    return config
}
