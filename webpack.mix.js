const mix = require('laravel-mix');
const path = require("path");
const modulesPath = "src"

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, modulesPath)
        },
    },
})

mix.autoload({
    jquery: ['$', 'jQuery', 'window.jQuery'],
});

mix.setPublicPath('public');
mix.js(modulesPath + '/main.jsx', '/js')
    .react()
    .version();
