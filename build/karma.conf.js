/* © AIG Business. See LICENSE file for full copyright & licensing details. */

var base = require( "./karma.base.conf.js" );

module.exports = function ( config ) {
    base.files.push( "./test/index.js" );

    var options = Object.assign( base, {
        preprocessors: {
            "./test/index.js": [ "webpack", "sourcemap" ],
        },
        /* Test results reporter to use. */
        reporters: [ "progress", "html" ],
    
        /* Jasmine Reporter configuration.  */
        htmlReporter: {
            outputDir: "../test/karma", 
            templatePath: null,
            focusOnFailures: true,
            namedFiles: false,
            pageTitle: null,
            urlFriendlyName: false,
            reportName: "report-summary-filename",
        },
        port: 10500,
        colors: true,
        singleRun: false,
    });

    config.set( options );
};
