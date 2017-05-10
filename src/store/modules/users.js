/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import C         from "../../helpers";
import users from "../../api/users";
import router    from "../../routes";

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
    users: [],
};

/**
 * List of getters used by Vue objects.
 * @constant
 * @type     {Object}
 * @memberof {Documents}
*/
const getters = {
    users: ( state ) => state.users,
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
    getUsers({ commit, state }, options ) {
        C( "Loading Users..." );

        users.get({
            token: options.token,
            callback: ( data ) => {
                C( "users loaded successfully!" );

                commit( "UPDATE_USERS", data.users );
            },
            errorCallback: ( data ) => {
                return data;
            }
        });
    },

    // TODO: comment.
    searchUsers({ commit, state }, options ) {
        C( "Searching users named: " + options.term );

        commit( "ENABLE_LOADING" );

        users.get({
            token: options.token,
            term: options.term,
            callback: ( data ) => {
                C( "Users searched successfully!" );

                commit( "UPDATE_DOCUMENTS", data.users );

                commit( "DISABLE_LOADING" );
            },
            errorCallback: ( data ) => {
                // TODO: Error handling.
                alert( "Error occurred!" );

                commit( "DISABLE_LOADING" );

                return data;
            }
        });
    },

    // TODO: comment.
    createUser({ commit, state }, options ) {
        C( "Creating new user named: " + options.name );

        commit( "ENABLE_LOADING" );

        return users.post({
            token: options.token,
            name: options.name,
            email: options.email,
            callback: ( data ) => {
                C( "Users created successfully! ID: " + data.id );
                commit( "DISABLE_LOADING" );
            },
            errorCallback: ( data ) => {
                // TODO: Error handling.
                alert( "Error occurred!" );

                commit( "DISABLE_LOADING" );

                return data;
            }
        });
    },

    // TODO: comment.
    deleteDocument({ commit, state }, options ) {
        C( "Deleting document ID: " + options.id );

        commit( "ENABLE_LOADING" );

        return documents.remove({
            token: options.token,
            documentId: options.id,
            callback: () => {
                C( "Users deleted successfully! ID: " + options.id );

                commit( "DISABLE_LOADING" );

                commit( "DELETE_DOCUMENT", options.index );
            },
            errorCallback: ( data ) => {
                // TODO: Error handling.
                alert( "Error occurred!" );

                commit( "DISABLE_LOADING" );

                return data;
            }
        });
    },

    // TODO: comment.
    exportUsers({ commit, state }, options ) {
        C( "Exporting document ID: " + options.id );

        commit( "ENABLE_LOADING" );

        return documents._export({
            token: options.token,
            usersId: options.usersId,
            content: options.content,
            callback: ( data ) => {
                C( "Users exported successfully! Google Drive ID: " + data.id );

                commit( "DISABLE_LOADING" );
            },
            errorCallback: ( data ) => {
                // TODO: Error handling.
                alert( "Error occurred!" );

                commit( "DISABLE_LOADING" );

                return data;
            }
        });
    }
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
     * Update the document list.
     * @function UPDATE_DOCUMENTS
     * @memberof Documents.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {Array} documents List of the loaded documents.
     * @returns  {void}
     */
    UPDATE_USERS( state, users ) {
        state.users = users;
    },

    /**
     * Delete a document by its array index.
     * @function DELETE_DOCUMENT
     * @memberof Documents.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {Integer} documentIndex index in the documents array.
     * @returns  {void}
     */
    DELETE_USER( state, userIndex ) {
        state.users.splice( userIndex, 1 );
    },
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
