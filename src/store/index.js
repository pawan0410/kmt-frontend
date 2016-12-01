/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import Vue  from "vue";
import Vuex from "vuex";

import app       from "./modules/app";
import documents     from "./modules/documents";
import processor from "./modules/processor";

/* Activate Flux state management. */
Vue.use( Vuex );

/**
 * Main application Vuex state store.
 * This is where we'll handle all of the application's state.
 * @constant
 * @type {Vuex.Store}
*/
export default new Vuex.Store({

    /**
     * Vuex Store modules help us separate and organize our global state.
     * Based on context.
     * @type {Object}
     */
    modules: {
        app,
        documents,
        processor
    }
});
