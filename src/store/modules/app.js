/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import jwtDecode from "jwt-decode";

import C      from "../../helpers";
import auth   from "../../api/auth";
import router from "../../routes";

const state = {
    authenticated: false,
    user: {
        id: null,
        name: ""
    },
    jwt: "test",
    companyName: "AIG Business",
    copyrightYear: new Date().getFullYear(),
};

const getters = {
    companyName: ( state ) => state.companyName,
    copyrightYear: ( state ) => state.copyrightYear,
    jwt: ( state ) => state.jwt
};

const actions = {
    authenticationDone({ commit, state }, options ) {
        C( "Authenticated successfully, updating state..." );

        commit( "UPDATE_AUTHENTICATION", options.token );

        C( "Continuing to the requested route..." );

        router.push( options.routeName );
    },
    authentication({ commit, state }, options ) {
        C( "Authentication..." );

        auth.validate({
            token: options.token,
            callback: ( data ) => {
                C( "Authenticated successfully!" );

                commit( "UPDATE_AUTHENTICATION", data.token );

                C( "Continuing to the requested route..." );

                options.next();
            },
            errorCallback: ( data ) => {
                C( "Token is not valid. Redirecting to login page...", false, 1 );
                // TODO: show error

                router.replace( "login" );

                return data;
            }
        });
    }
};

const mutations = {
    UPDATE_AUTHENTICATION( state, token ) {
        let payload = jwtDecode( token );

        state.user = {
            id: payload.uid,
            name: payload.name
        };

        state.authenticated = true;
        state.jwt = token;

        localStorage.setItem( "token", token );
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
