
/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $ from "jquery";
import configuration from "./configuration";

const usersEndpoint = configuration.apiEndpoint + "users/";

function get( token, id, cb, errorCb ) {
    $.ajax({
        url: usersEndpoint + id,
        data: JSON.stringify( { token } ),
        type: "post",
        contentType: "application/json",
    }).then( function( data ) {
        cb( data.user );
    }).fail( function( xhr ) {
        errorCb( xhr.responseJSON );
    });
}

export default {
    get
};
