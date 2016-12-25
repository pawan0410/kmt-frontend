/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import C         from "../../helpers";
import documents from "../../api/documents";
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

    // TODO: comment.
    searchDocuments({ commit, state }, options ) {
        C( "Searching documents named: " + options.term );

        commit( "ENABLE_LOADING" );

        documents.get({
            token: options.token,
            term: options.term,
            callback: ( data ) => {
                C( "Documents searched successfully!" );

                commit( "UPDATE_DOCUMENTS", data.documents );

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
    createDocument({ commit, state }, options ) {
        C( "Creating new document named: " + options.name );

        commit( "ENABLE_LOADING" );

        return documents.post({
            token: options.token,
            name: options.name,
            callback: ( data ) => {
                C( "Documents created successfully! ID: " + data.id );

                commit( "DISABLE_LOADING" );

                router.push({
                    name: "edit-document",
                    params: { id: data.id }
                });
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
                C( "Documents deleted successfully! ID: " + options.id );

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
    UPDATE_DOCUMENTS( state, documents ) {
        state.documents = documents;
    },

    /**
     * Delete a document by its array index.
     * @function DELETE_DOCUMENT
     * @memberof Documents.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {Integer} documentIndex index in the documents array.
     * @returns  {void}
     */
    DELETE_DOCUMENT( state, documentIndex ) {
        state.documents.splice( documentIndex, 1 );
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
