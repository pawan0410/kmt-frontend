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
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function get( options ) {
    let searchEndPoint = endpoint + ( options.documentId || "" );

    if( options.term  )
        searchEndPoint = endpoint + "?term=" + options.term;

    return $.ajax({
        url: searchEndPoint,
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
 * REST call to update a document's.
 * @function put
 * @memberof DocumentsAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {Array}    options.fields        List of fields and their values to be updated.

 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function put( options ) {
    let documentId = options.documentId || "",
        data = {
            fields: options.fields
        };

    return $.ajax({
        url: endpoint + documentId,
        type: "put",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify( data ),
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
 * REST call to create a new document.
 * @function post
 * @memberof DocumentsAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {String}   options.name          Name of the new document.
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function post( options ) {
    let documentId = options.documentId || "",
        data = {
            name: options.name,
            keyword: options.keyword
        };

    return $.ajax({
        url: endpoint + documentId,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify( data ),
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
 * REST call to delete a document.
 * @function delete
 * @memberof DocumentsAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {String}   options.id            ID of the document to be deleted.
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function remove( options ) {
    let documentId = options.documentId || "";

    return $.ajax({
        url: endpoint + documentId,
        type: "delete",
        contentType: "application/json",
        dataType: "json",
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
 * REST call to export a document to Google Drive.
 * Note: named _export because export is a keyword.
 * @function delete
 * @memberof DocumentsAPI
 * @param    {Object}   options               List of parameters for this method.
 * @param    {String}   options.token         JWT token to validate.
 * @param    {String}   options.id            ID of the document to be deleted.
 * @param    {String}   options.content       HTML content of the document.
 * @param    {Function} options.callback      Success callback.
 * @param    {Function} options.errorCallback Failure callback.
 * @returns  {void}
 */
function _export( options ) {
    let documentId = options.documentId || "",
        data = {
            content: options.content
        };

    return $.ajax({
        url: endpoint + "export/" + documentId,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify( data ),
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
    get,
    put,
    post,
    remove,
    _export
};
