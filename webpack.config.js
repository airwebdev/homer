/**
 * webpack
 *
 * Triggered via NPM commands to build development or production
 * environments with the commands:
 *
 * npm run dev
 *
 * or
 *
 * npm run build
 *
 * This file concatinates and minifies your CSS and JS and runs
 * transformations where configured.
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * WordPress Block Components.
 *
 * Defines the WordPress Block Components.
 */
const wplib = ['blocks', 'components', 'date', 'editor', 'element', 'i18n', 'utils', 'data'];

/**
 * Extract CSS from JS.
 */
const editorCSS = new MiniCssExtractPlugin({
    filename: './assets/css/editor.css',
});

const typewriterCSS = new MiniCssExtractPlugin({
    filename: './assets/css/typewriter.css',
});

const typewriterEditorCSS = new MiniCssExtractPlugin({
    filename: './assets/css/editor/typewriterEditor.css',
});

const spoilerCSS = new MiniCssExtractPlugin({
    filename: './assets/css/spoiler.css',
});

const spoilerEditorCSS = new MiniCssExtractPlugin({
    filename: './assets/css/editor/spoilerEditor.css',
});

const popoverCSS = new MiniCssExtractPlugin({
    filename: './assets/css/popover.css',
});

const popoverEditorCSS = new MiniCssExtractPlugin({
    filename: './assets/css/editor/popoverEditor.css',
});

const upperCSS = new MiniCssExtractPlugin({
    filename: './assets/css/uppercase.css',
});

const lowerCSS = new MiniCssExtractPlugin({
    filename: './assets/css/lowercase.css',
});

const capitalizeCSS = new MiniCssExtractPlugin({
    filename: './assets/css/capitalize.css',
});

const srCSS = new MiniCssExtractPlugin({
    filename: './assets/css/sr.css',
});

const srEditorCSS = new MiniCssExtractPlugin({
    filename: './assets/css/editor/srEditor.css',
});

const underlineCSS = new MiniCssExtractPlugin({
    filename: './assets/css/underline.css',
});

const iconsCSS = new MiniCssExtractPlugin({
    filename: './assets/css/icons.css',
});

const settingsPageCSS = new MiniCssExtractPlugin({
    filename: './assets/css/settingsPage.css',
});

/**
 * ExtractTextPlugin Config.
 *
 * Configuration for the ExtractTextPlugin which extracts CSS from JS.
 * Note that the autoprefixer plugin is used here, so that CSS is
 * prefixed with Cross-Browser variations.
 */
const extractConfig = {
    use: [
        { loader: 'raw-loader' },
        {
            loader: 'sass-loader',
            query: {
                outputStyle: 'compressed',
            },
        },
        // {
        //     loader: 'postcss-loader',
        //     options: {
        //         plugins: [require('autoprefixer')],
        //     },
        // },
    ],
};

/**
 * webpack main config
 */
module.exports = {
    /**
     * JavaScript entry points.
     *
     * Note that index.js in the blocks is the main entry point of the block,
     * This is compiled into editor.js in the assets/js folder.
     */
    entry: {
        // Editor js
        './assets/js/editor/editor': './assets/src/js/editor.js',
        './assets/js/editor/typewriter': './assets/src/js/editor/typewriter',
        './assets/js/editor/underline': './assets/src/js/editor/underline',
        './assets/js/editor/lowercase': './assets/src/js/editor/lowercase',
        './assets/js/editor/capitalize': './assets/src/js/editor/capitalize',
        './assets/js/editor/sr': './assets/src/js/editor/sr',
        './assets/js/editor/uppercase': './assets/src/js/editor/uppercase',
        './assets/js/editor/spoiler': './assets/src/js/editor/spoiler',
        './assets/js/editor/popover': './assets/src/js/editor/popover',
        './assets/js/editor/specialChars': './assets/src/js/editor/specialChars',
        './assets/js/editor/homer': './assets/src/js/editor/homer',
        './assets/js/editor/lang': './assets/src/js/editor/lang',
        './assets/js/editor/emoji': './assets/src/js/editor/emoji',
        './assets/js/editor/icons': './assets/src/js/editor/icons',
        // Frontend js
        './assets/js/frontend/typewriterFrontEnd': './assets/src/js/frontend/typewriter.js',
        './assets/js/frontend/spoilerFrontEnd': './assets/src/js/frontend/spoiler.js',
        // Settings Page js
        './assets/js/settingsPage': './assets/src/js/settingsPage.js',
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
    },
    /**
     * Externals
     *
     * Loop through the WordPress dependencies, and include each one when compiling.
     *
     * Also Include any external code (such as React and ReactDOM), that third party
     * libraries may be dependant on.
     */
    externals: wplib.reduce(
        (externals, lib) => {
            externals[`wp.${lib}`] = {
                window: ['wp', lib],
            };
            return externals;
        },
        {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
    ),
    watch: true,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            // Run babel to compile JSX and ESNext into ES5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ['@babel/plugin-transform-runtime', {
                                regenerator: true
                            }]
                        ]
                    }
                },
            },
            // Extract CSS from JS
            {
                test: /editor\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /typewriter\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /icons\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /typewriterEditor\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /spoiler\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /spoilerEditor\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /popover\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /popoverEditor\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /uppercase\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /lowercase\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /capitalize\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /sr\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /srEditor\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /underline\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
            {
                test: /settingsPage\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                const { chunk } = pathData;
                const name = chunk.name;
                
                // Convert js paths to css paths
                if (name.includes('/js/')) {
                    return name.replace('/js/', '/css/') + '.css';
                }
                
                return name + '.css';
            },
        }),
    ],
};
