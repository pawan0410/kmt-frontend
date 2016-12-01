/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import "./assets/global.sass";

import Vue            from "vue";
import VueRouter      from "vue-router";
import { mapGetters } from "vuex";

import C      from "./helpers";
import router from "./routes";
import store  from "./store";

Vue.use( VueRouter );

C( "Starting application..." );

/* eslint-disable no-unused-vars */
const app = new Vue({
    store,
    router,
    computed: {
        ...mapGetters({
            jwt: "jwt"
        }),
    },
}).$mount( "#app" );
