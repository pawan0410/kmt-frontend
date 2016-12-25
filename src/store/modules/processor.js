/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import documents from "../../api/documents";
import C         from "../../helpers";

/**
 * Document Processor global state.
 * @constant
 * @type      {Object}
 * @namespace {Processor.State}
 * @memberof  {Processor}
*/
const state = {

    /**
     * Document name.
     * @type     {String}
     * @memberof Processor.State
     */
    name: "",

    /**
     * Document id.
     * @type     {Number}
     * @memberof Processor.State
     */
    id: null,

    /**
     * Document content in the form of a quill Delta.
     * @type     {Object}
     * @memberof Processor.State
     */
    delta: null
};

/**
 * List of getters used by Vue objects.
 * @constant
 * @type     {Object}
 * @memberof {Processor}
*/
const getters = {
    documentId: ( state ) => state.id,
    documentDelta: ( state ) => state.delta,
};

/**
 * List of actions to perform various API calls, etc.
 * Also used to mutate the state.
 * @constant
 * @type      {Object}
 * @memberof  {Processor}
 * @namespace {Processor.Actions}
*/
const actions = {

    // TODO: comment this.
    loadDocument({ commit, stat }, options ) {
        C( "Loading document..." );

        return documents.get({
            token: options.token,
            documentId: options.documentId,
            callback: ( data ) => {
                C( "Document loaded successfully!" );

                commit( "UPDATE_DOCUMENT", data.documents[ 0 ] );
            },
            errorCallback: ( data ) => {
                return data;
            }
        });
    },

    /**
     * Save the current document's delta.
     * @function saveDocument
     * @memberof Documents.Actions
     * @param    {Object} commit/state properties of the Vuex store.
     * @param    {Object} options List of options.
     * @param    {String} options.documentId Document ID to save.
     * @param    {String} options.delta Document delta to save.
     * @returns  {void}
     */
    saveDocument({ commit, state }, options ) {
        C( "Saving document..." );

        commit( "ENABLE_LOADING" );

        commit( "UPDATE_DELTA", options.delta );

        return documents.put({
            token: options.token,
            documentId: options.documentId,
            fields: {
                delta: JSON.stringify( options.delta )
            },
            callback: () => {
                C( "Document saved successfully!" );

                commit( "DISABLE_LOADING" );
            },
            errorCallback: ( data ) => {
                // TODO: Error handling popup.
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
 * @memberof  {Processor}
 * @namespace {Processor.Mutations}
*/
const mutations = {

    /**
     * Update the document state.
     * @function UPDATE_DOCUMENT
     * @memberof Processor.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {Array} document object containg document data.
     * @returns  {void}
     */
    UPDATE_DOCUMENT( state, document ) {
        state.id = document.id;

        state.name = document.name;

        state.delta = JSON.parse( document.delta || "[]" );
    },

    /**
     * Update the document's delta.
     * @function UPDATE_DELTA
     * @memberof Processor.Mutations
     * @param    {Object} state property of the Vuex store.
     * @param    {Object} delta object containg document delta.
     * @returns  {void}
     */
    UPDATE_DELTA( state, delta ) {
        state.delta = delta;
    }
};

/**
 * @type {Object}
 * @namespace Processor
*/
export default {
    state,
    getters,
    actions,
    mutations
};
