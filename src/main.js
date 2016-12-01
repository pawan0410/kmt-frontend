/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import "./assets/global.sass";

import Vue            from "vue";
import VueRouter      from "vue-router";

import C      from "./helpers";
import router from "./routes";
import store  from "./store";

/* Activate the routing system. */
Vue.use( VueRouter );

C( "Starting application..." );

/* eslint-disable no-unused-vars */
/**
 * Main application Vue instance.
 * This is the starting point of the entire application.
 * @constant
 * @type {Vue}
*/
const app = new Vue({
    store,
    router,
}).$mount( "#app" );
