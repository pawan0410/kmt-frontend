/* © AIG Business. See LICENSE file for full copyright & licensing details. */

var base = require( "./karma.base.conf.js" );

module.exports = function( config ) {
    base.webpack.babel = {
        plugins: [ [ "coverage", { ignore: [ "test/", "node_modules/" ] } ] ]
    };

    var options = Object.assign( base, {
        files: [
            "../test/index.js"
        ],
        preprocessors: {
            "../test/index.js": [ "webpack", "sourcemap" ],
        },
        reporters: [ "coverage" ],

        coverageReporter: {
            dir: "../test/coverage",
            reporters: [
                { type: "lcov", subdir: "." },
                { type: "text-summary" },
            ]
        },
        singleRun: true,
    })

    config.set( options );
};

