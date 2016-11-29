/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $ from "jquery";
import configuration from "./configuration";

const authEndpoint = configuration.apiEndpoint + "auth/";

function authenticate( credentials, cb, errorCb ) {
    $.ajax({
        url: authEndpoint + "token",
        data: JSON.stringify( credentials ),
        type: "post",
        contentType: "application/json",
    }).then( function( data ) {
        cb( data.token );
    }).fail( function( xhr ) {
        errorCb( xhr.responseJSON );
    });
}

export default {
    authenticate
};
