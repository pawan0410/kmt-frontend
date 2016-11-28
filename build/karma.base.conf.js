/* © AIG Business. See LICENSE file for full copyright & licensing details. */

var webpackConfig = {
    resolve: {
        extensions: [ "", ".js" ]
    },
    devtool: "#inline-source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader?presets=es2015&retainLines=true",
                exclude: /node_modules/
            }
        ]
    },
}

/* Shared configuration. */
module.exports = {
    basePath: "../",
    files: [
        { pattern: "./src/**/*.js", included: false, served: true },
        { pattern: "./test/**/*.js", included: false, served: true },
    ],
    frameworks: [ "jasmine" ],
    webpack: webpackConfig,
    browsers: [ "PhantomJS" ]
};