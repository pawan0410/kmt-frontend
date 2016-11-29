/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import "./assets/global.sass";

import Vue            from "vue";
import VueRouter      from "vue-router";
import { mapGetters } from "vuex";

import router    from "./routes";
import store     from "./store";

Vue.use( VueRouter );

/* eslint-disable no-unused-vars */
const app = new Vue({
    store,
    router,
    created() {
        let token = localStorage.getItem( "token" );

        /* eslint-disable */
        if( token )
            this.$store.commit( "UPDATE_AUTH_TOKEN", token );
        else
            router.push( "login" );
    },
    computed: {
        ...mapGetters({
            jwt: "jwt"
        }),
    },
}).$mount( "#app" );
