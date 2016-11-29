/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import Vue  from "vue";
import Vuex from "vuex";

import app       from "./modules/app";
import files     from "./modules/files";
import processor from "./modules/processor";

Vue.use( Vuex );

export default new Vuex.Store({
    modules: {
        app,
        files,
        processor
    }
});
