/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $ from "jquery";
import configuration from "./configuration";

/**
 * Keywords REST endpoint.
 * @constant
 * @type     {String}
 * @memberof KeywordsAPI
*/
const endpoint = configuration.apiEndpoint + "keywords/";

/**
 * REST call to get a list of 5 keywords.
 * if a prefix is provided then a filter is applied.
 * @function get
 * @memberof KeywordsAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {String}   options.prefix        Keyword prefix for filtering.
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function get( options ) {
    let autoCompleteEndPoint = endpoint;

    if( options.prefix  )
        autoCompleteEndPoint = endpoint + "?prefix=" + options.prefix;
    else if( options.keyword )
        autoCompleteEndPoint = endpoint + options.keyword;

    return $.ajax({
        url: autoCompleteEndPoint,
        type: "get",
        contentType: "application/json",
        beforeSend: ( request ) => {

            /* We send the token through the Authorization HTTP header. */
            request.setRequestHeader( "Authorization", "Bearer " + options.token );
        },
    })
    .then( options.callback )
    .fail( function( xhr ) {
        options.errorCallback( xhr.responseJSON );
    });
}

/**
 * @namespace KeywordsAPI
 */
export default {
    get
};
