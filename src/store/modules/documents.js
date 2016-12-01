/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import documents from "../../api/documents";
import C         from "../../helpers";

/* TODO: Build this. */


/**
 * Documents global state.
 * @constant
 * @type      {Object}
 * @namespace {Documents.State}
 * @memberof  {Documents}
*/
const state = {

    /**
     * List of the current user's documents.
     * @type     {Array}
     * @memberof Documents.State
     */
    documents: [],
};

/**
 * List of getters used by Vue objects.
 * @constant
 * @type     {Object}
 * @memberof {Documents}
*/
const getters = {
    documents: ( state ) => state.documents,
};

/**
 * List of actions to perform various API calls, etc.
 * Also used to mutate the state.
 * @constant
 * @type      {Object}
 * @memberof  {Documents}
 * @namespace {Documents.Actions}
*/
const actions = {

    /**
     * Get a list of the current user's documents.
     * @function getDocuments
     * @memberof Documents.Actions
     * @param    {Object} commit/state properties of the Vuex store.
     * @param    {Object} options List of options.
     * @param    {String} options.token JWT Token.
     * @returns  {void}
     */
    getDocuments({ commit, state }, options ) {
        C( "Loading documents..." );

        documents.get({
            token: options.token,
            callback: ( data ) => {
                C( "Documents loaded successfully!" );

                commit( "UPDATE_DOCUMENTS", data.documents );
            },
            errorCallback: ( data ) => {
                return data;
            }
        });
    },
};

/**
 * Mutations, this is where we actually apply changes to our state.
 * @constant
 * @type      {Object}
 * @memberof  {Documents}
 * @namespace {Documents.Mutations}
*/
const mutations = {

    /**
     * Update the loading state.
     * @function UPDATE_DOCUMENTS
     * @memberof Documents.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {Array} documents List of the loaded documents.
     * @returns  {void}
     */
    UPDATE_DOCUMENTS( state, documents ) {
        state.documents = documents;
    }
};

/**
 * @type {Object}
 * @namespace Documents
*/
export default {
    state,
    getters,
    actions,
    mutations
};
