/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import jwtDecode from "jwt-decode";

import C      from "../../helpers";
import auth   from "../../api/auth";
import router from "../../routes";

/**
 * Application global state.
 * @constant
 * @type     {Object}
 * @memberof {AppStore}
*/
const state = {

    /* Are we authenticated or not. */
    authenticated: false,

    /* Currently authenticated user.*/
    user: {
        id: null,
        name: ""
    },

    /* JWT token */
    jwt: "",

    /* TODO: Comment this. */
    documents: [],
    currentDocument: {
        name: "",
        delta: null,
    },

    /* Todo: Get this from the webservice. */
    companyName: "AIG Business",

    copyrightYear: new Date().getFullYear(),

    /* Are we loading something right now?*/
    loading: true
};

/**
 * List of getters used by Vue objects.
 * @constant
 * @type     {Object}
 * @memberof {AppStore}
*/
const getters = {
    companyName: ( state ) => state.companyName,
    copyrightYear: ( state ) => state.copyrightYear,
    jwt: ( state ) => state.jwt,
    loading: ( state ) => state.loading
};

/**
 * List of actions to perform various API calls, etc.
 * Also used to mutate the state.
 * @constant
 * @type      {Object}
 * @memberof  {AppStore}
 * @namespace {AppStore.Actions}
*/
const actions = {

    /**
     * The user has been authenticated, we can now mutate the state.
     * @function authenticationDone
     * @memberof AppStore.Actions
     * @param    {Object} commit/state properties of the Vuex store.
     * @param    {Object} options List of options
     * @param    {String} options.token JWT Token
     * @param    {String} options.routeName Route to navigate to.
     * @returns  {void}
     */
    authenticationDone({ commit, state }, options ) {
        C( "Authenticated successfully, updating state..." );

        commit( "UPDATE_AUTHENTICATION", options.token );

        C( "Continuing to the requested route..." );

        router.push( options.routeName );
    },

    /**
     * Validate the token and authenticate.
     * @function authentication
     * @memberof AppStore.Actions
     * @param    {Object} commit/state properties of the Vuex store.
     * @param    {Object} options List of options.
     * @param    {String} options.token JWT Token.
     * @param    {String} options.routeName Route to navigate to.
     * @returns  {void}
     */
    authentication({ commit, state }, options ) {
        C( "Authentication..." );

        auth.validate({
            token: options.token,
            callback: ( data ) => {
                C( "Authenticated successfully!" );

                commit( "UPDATE_AUTHENTICATION", data.token );

                C( "Continuing to the requested route..." );

                router.push( options.routeName );

                commit( "DISABLE_LOADING" );
            },
            errorCallback: ( data ) => {
                C( "Token is not valid. Redirecting to login page...", false, 1 );

                commit( "DISABLE_LOADING" );

                /* TODO: Show error */

                router.replace( "login" );

                return data;
            }
        });
    },

    /**
     * To stop application loading mode.
     * to the login page.
     * @function loadingDone
     * @memberof AppStore.Actions
     * @param    {Function} commit properties of the Vuex store.
     * @returns  {void}
     */
    loadingDone({ commit }) {
        commit( "DISABLE_LOADING" );
    },

    /**
     * Destroy the local storage token and redirect the user
     * to the login page.
     * @function signOut
     * @memberof AppStore.Actions
     * @returns  {void}
     */
    signOut() {
        localStorage.removeItem( "token" );

        location.reload();
    }
};

/**
 * Mutations, this is where we actually apply changes to our state.
 * @constant
 * @type      {Object}
 * @memberof  {AppStore}
 * @namespace {AppStore.Mutations}
*/
const mutations = {

    /**
     * Update the authentication/user state.
     * @function UPDATE_AUTHENTICATION
     * @memberof AppStore.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {String} token Authenticated token JWT Token.
     * @returns  {void}
     */
    UPDATE_AUTHENTICATION( state, token ) {
        let payload = jwtDecode( token );

        state.user = {
            id: payload.uid,
            name: payload.name
        };

        state.authenticated = true;
        state.jwt = token;

        /**
         * Save the token to the browser's local storage, so that we can resume
         * the session in case there was a refresh, this replaces cookies.
         */
        localStorage.setItem( "token", token );
    },

    /**
     * Update the loading state.
     * @function DISABLE_LOADING
     * @memberof AppStore.Mutations
     * @param    {Object} state property of the Vuex store.
     * @returns  {void}
     */
    DISABLE_LOADING( state ) {
        state.loading = false;
    }
};

/**
 * @type {Object}
 * @namespace AppStore
*/
export default {
    state,
    getters,
    actions,
    mutations
};
