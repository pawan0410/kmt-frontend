/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import VueRouter      from "vue-router";

import Files from "./components/Files";
import Login from "./components/Login";
import C     from "./helpers";
import store from "./store";

/* eslint-disable callback-return */
function checkAuthentication( to, from, next ) {
    C( "Checking authentication...", "Router" );

    let token = localStorage.getItem( "token" );

    if( store.state.app.authenticated )
        next();
    else if( token ) {
        C( "Previous JWT Token found." );
        // if( from == to )
            // return next();

        store.dispatch( "authentication", { token, next });
    } else {
        C( "No Token Found. Redirecting to login page..." );
        router.push( "login" );
    }
}

const routes = [
    { name: "login", path: "/login", component: Login },
    { name: "files", path: "/files", component: Files, beforeEnter: checkAuthentication },
    { path: "*", redirect: { name: "files" } }
];

const router = new VueRouter({ routes });

export default router;
