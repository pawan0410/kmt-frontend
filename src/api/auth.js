/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $ from "jquery";
import configuration from "./configuration";

const authEndpoint = configuration.apiEndpoint + "auth/";

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

function validate( options ) {
    $.ajax({
        url: authEndpoint + "validate",
        type: "post",
        contentType: "application/json",
        beforeSend: ( request ) => {
            request.setRequestHeader( "Authorization", "Bearer " + options.token );
        },
    })
    .then( options.callback )
    .fail( function( xhr ) {
        options.errorCallback( xhr.responseJSON );
    });
}

export default {
    authenticate,
    validate
};
