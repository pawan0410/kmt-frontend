/* © AIG Business. See LICENSE file for full copyright & licensing details. */

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
};

const mutations = {
    UPDATE_AUTH_TOKEN( state, jwt ) {
        state.authenticated = true;
        state.jwt = jwt;

        localStorage.setItem( "token", jwt );
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
