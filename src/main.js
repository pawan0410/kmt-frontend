/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import "./assets/global.sass";

import Vue            from "vue";
import VueRouter      from "vue-router";
import { mapGetters } from "vuex";

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
 * @namespace MainApp
*/
const app = new Vue({
    store,
    router,

    /**
     * Computed properties.
     * @type {Object}
     * @memberof MainApp
     */
    computed: {
        ...mapGetters({
            loading: "loading",
            applicationError: "applicationError"
        })
    },

    /**
     * List of methods used within the view.
     * @type {Object}
     * @memberof MainApp
     */
    methods: {

        /**
         * Clear and hide error box.
         * @function closeErrorBox
         * @returns {void}
         * @memberof MainApp
         */
        closeErrorBox() {
            this.$store.dispatch( "applicationError" );
        }
    }

}).$mount( "#app" );
