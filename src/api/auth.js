/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $ from "jquery";
import configuration from "./configuration";

/**
 * Authentication REST endpoint.
 * @constant
 * @type     {String}
 * @memberof AuthenticationAPI
*/
const authEndpoint = configuration.apiEndpoint + "auth/";

/**
 * user Authentication through REST call.
 * When the authentication is successfull we receive a JWT Token.
 * @function authenticate
 * @memberof AuthenticationAPI
 * @param    {Object}   credentials   Email/password combination.
 * @param    {Function} callback      Success callback.
 * @param    {Function} errorCallback Failure callback.
 * @returns  {void}
 */
function authenticate( credentials, callback, errorCallback ) {
    $.ajax({
        url: authEndpoint,
        data: JSON.stringify( credentials ),
        type: "post",
        contentType: "application/json",
    })
    .then( callback )
    .fail( function( xhr ) {
        errorCallback( xhr.responseJSON );
    });
}

/**
 * JWT Token validation through REST call.
 * When the token is validated, we receive it again.
 * @function validate
 * @memberof AuthenticationAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function validate( options ) {
    $.ajax({
        url: authEndpoint + "validate",
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
 * @namespace AuthenticationAPI
 */
export default {
    authenticate,
    validate
};
