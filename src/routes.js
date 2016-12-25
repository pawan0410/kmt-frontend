/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import VueRouter      from "vue-router";

import { Documents, Login, Processor } from "./components/";

import C     from "./helpers";
import store from "./store";

/* eslint-disable callback-return */
/**
 * Check if the current user is authenticated before continuing with the
 * requested route.
 * @function checkAuthentication
 * @param    {Object}   to The route we're going to.
 * @param    {Object}   from The route we came from.
 * @param    {Function} next to continue the routing process.
 * @returns  {void}
 */
function checkAuthentication( to, from, next ) {
    C( "Checking authentication...", "Router" );

    store.dispatch( "loading" );

    let token = localStorage.getItem( "token" );

    /* User is currently authenticated, carry on. */
    if( store.state.app.authenticated ) {
        next();
        store.dispatch( "loadingDone" );
    } else if( token ) {

        /* We've found a stored token, we need to validate it. */
        C( "Previous JWT Token found." );

        store.dispatch( "authentication", { token, routeName: to.path });
    } else {
        C( "No Token Found. Redirecting to the login page..." );
        router.push( "login" );

        store.dispatch( "loadingDone" );
    }
}

/**
 * Global application routes.
 * @constant
 * @type {Array}
*/
const routes = [
    { name: "login", path: "/login", component: Login },
    { name: "documents", path: "/documents", component: Documents, beforeEnter: checkAuthentication },
    { name: "edit-document", path: "/edit/:id", component: Processor, beforeEnter: checkAuthentication },
    { path: "*", redirect: { name: "documents" } }
];

/**
 * Router object to manage app navigation.
 * @constant
 * @type {VueRouter}
*/
const router = new VueRouter({ routes });

export default router;
