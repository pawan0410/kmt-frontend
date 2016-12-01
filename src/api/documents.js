/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $ from "jquery";
import configuration from "./configuration";

/**
 * Documents REST endpoint.
 * @constant
 * @type     {String}
 * @memberof DocumentsAPI
*/
const endpoint = configuration.apiEndpoint + "documents/";

/**
 * REST call to get the list of the current user's documents.
 * @function get
 * @memberof DocumentsAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {Number} options.userId        Owner of the requested files.
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function get( options ) {
    $.ajax({
        url: endpoint + "get",
        type: "post",
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
 * @namespace DocumentsAPI
 */
export default {
    get
};
