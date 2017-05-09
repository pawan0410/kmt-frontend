<script>
/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import { mapGetters } from "vuex";

import SmallModal from "./sub/SmallModal";
    
import PermissionModal from "./sub/PermissionModal";

import C from "../helpers";

/**
 * Document manager Vue instance.
 * Displays the user's documents.
 * @type {Vue}
 * @namespace DocumentsVue
*/
export default {

    /**
     * Local state generator.
     * @function data
     * @memberof DocumentsVue
     * @returns {Object} List of local state default values.
     */
    data() {
        return {

            /* When we click on a document, it gets selected here. */
            selectedDocument: null,

            /* Flag to toggle document delete confirmation popup. */
            showDocumentDeletionForm: false,

            /* Flag to toggle search box. */
            showSearchBox: false,

            /* Search term provided by the user in the search box. */
            searchTerm: "",

            /* Flag mto toggle document create form. */
            showDocumentCreationForm: false,

            /* Contains document name provided by the user when creating a new one. */
            newDocumentName: "",

            /* Contains keyword name to be used in creating a new document. */
            newDocumentKeyword: "",
            
            showFilePermission: false
        };
    },

    components: {
        SmallModal,
        PermissionModal
    },

    /**
     * Computed properties.
     * @type     {Object}
     * @memberof DocumentsVue
     */
    computed: {
        ...mapGetters({
            companyName: "companyName",
            copyrightYear: "copyrightYear",
            documents: "documents",
            user: "user",
            jwt: "jwt"
        })
    },

    /**
     * List of methods used within the view.
     * @type {Object}
     * @memberof DocumentsVue
     */
    methods: {

        /**
         * Sign the user out!
         * @function signOut
         * @returns {void}
         */
        signOut() {
            this.$store.dispatch( "signOut" );
        },

        // TODO: comment. named thusly to avoid being confused with global document.
        selectDocument( theDocument ) {
            this.selectedDocument = theDocument;
        },

        // TODO: comment.
        openDocument( documentId ) {
            this.$router.push({
                name: "edit-document",
                params: { id: documentId }
            });
        },

        // TODO: comment.
        requestDocumentDeletion() {
            if( !this.selectedDocument )
                return;

            this.showDocumentDeletionForm = true;
        },

        // TODO: comment.
        doSearchBox() {
            this.showSearchBox = !this.showSearchBox;

            if( this.showSearchBox )
                this.$refs.searchBox.focus();
            else /* Search the search field. */
                this.searchTerm = "";
        },

        // TODO: comment
        doSearchDocuments() {
            C( this.searchTerm );
            this.$store.dispatch( "searchDocuments", {
                token: this.jwt,
                term: this.searchTerm
            });
        },

        // TODO: comment.
        doCreateDocument() {
            this.$store.dispatch( "createDocument", {
                token: this.jwt,
                name: this.newDocumentName,
                keyword: this.newDocumentKeyword
            }).then( () => {
                this.showDocumentCreationForm = false;
            });
        },

        // TODO: comment
        documentCreationForm() {
            this.showDocumentCreationForm = true;

            this.newDocumentName = "";
        },

        // TODO: Comment
        doDeleteDocument() {
            let store = this.$store;

            store.dispatch( "deleteDocument", {
                token: this.jwt,
                id: this.selectedDocument.id,
                index: this.documents.indexOf( this.selectedDocument )
            }).then( () => {
                this.showDocumentDeletionForm = false;
            });
        }
    },

    /**
     * Hook that gets executed once the Vue object is created.
     * @type {Function}
     * @memberof DocumentsVue
     * @returns {void}
     */
    created() {
        this.$store.dispatch( "getDocuments", { token: this.jwt });
    }
};
</script> 

    
    




<template>
    <div class="documents-manager">
        <aside>
            <div class="profile-picture"></div>

            <h3 class="name">{{ user.name }}</h3>

            <div class="overview"><span>{{ documents.length }}</span> Documents</div>

            <ul class="menu">               
                <li v-if="user.user_type_id == 1 || user.user_type_id == 3 "><a href="/#/backoffice" >Backoffice</a></li>
            </ul>

            <button class="sign-out" @click="signOut()"></button>

            <footer>{{ companyName }} © {{ copyrightYear }}</footer>
        </aside>

        <section class="content">
            <header>
                <button class="add" @click="documentCreationForm()"></button>
                <button class="delete" @click="requestDocumentDeletion()" v-show="selectedDocument"></button>

                <h2 class="title">Users</h2>

                <input type="text"
                       class="search-field"
                       v-model="searchTerm"
                       v-bind:class="{ active: showSearchBox }"
                       ref="searchBox"
                       @keyup.enter="doSearchDocuments()">
                <button class="search" v-bind:class="{ active: showSearchBox }" @click="doSearchBox()"></button>
            </header>

            <section class="documents">
                  <!--<div v-for="document in documents"
                     class="document"
                     v-on:click="selectDocument( document )"
                     v-on:dblclick="openDocument( document.id )"
                     v-bind:class="{ selected: selectedDocument == document }">
                    <h4>{{ document.name }}</h4>
                    <p>{{ document.update_time }}</p>
                </div> -->
                
                
<table>
    <tbody>
        <tr>
          <th>Sr No</th>
          <th>User Name</th>
          <th>Department</th>
          <th>Emai Id</th>
          <th>Edit</th>
          <th>Dedele</th>
        </tr>
        <tr>
            <td>01</td>
            <td ><a @click="showFilePermission = true"  href="#">Maria Anders</a></td>
            <td>IT</td>
            <td>maria@gmail.com</td>
            <td><a href="#"><img  src="../assets/images/edit.svg"></a> </td>
            <td><a href="#"><img src="../assets/images/delete.svg"></a> </td>
        </tr>
        <tr>
            <td>01</td>
            <td>Maria Anders</td>
            <td>IT</td>
            <td>maria@gmail.com</td>
            <td><a href="#"><img  src="../assets/images/edit.svg"></a> </td>
            <td><a href="#"><img src="../assets/images/delete.svg"></a> </td>
        </tr>
        <tr>
            <td>01</td>
            <td>Maria Anders</td>
            <td>IT</td>
            <td>maria@gmail.com</td>
            <td><a href="#"><img  src="../assets/images/edit.svg"></a> </td>
            <td><a href="#"><img src="../assets/images/delete.svg"></a> </td>
        </tr>

</tbody>
    </table>
                
       
                
      
     
    
                
                
                
                
            </section>

            <!-- Form: Create a new document -->
            <small-modal title="Create a New user"
                         v-if="showDocumentCreationForm"
                         @close="showDocumentCreationForm = false">
                <input type="text"
                       autocomplete="off"
                       name="name"
                       placeholder="Edit name..."
                       />

                <input type="text"
                       autocomplete="off"
                       name="keyword"
                       placeholder="SEdit Email..."
                      />
                
                
                <select class="dd" name="1" size="1">
                  <option >IT</option>
                  <option>RCM test</option>
                  <option>three</option>
                </select>


<br /><br />
                <button type="submit" >Create User</button>
                
                
            </small-modal>

            <!-- Form: Delete document -->
            <small-modal title="Delete Document"
                         v-if="showDocumentDeletionForm"
                         @close="showDocumentDeletionForm = false">
                
                <p>Are you sure you want to delete this document?</p>

                <button type="submit" @click="doDeleteDocument()">Delete</button>
            </small-modal>
            
            <permission-modal 
                              v-if="showFilePermission" 
                              @close="showFilePermission = false">
                            <div class="popup-box">
                           
                            <div class="popup-row">

                                  <input type="checkbox" name="checkboxG4" id="checkboxG4" class="css-checkbox" />
                                <label for="checkboxG4" class="css-label">Option 1</label>
                               </div>

                                <div class="popup-row">
                                 <input type="checkbox" name="checkboxG5" id="checkboxG5" class="css-checkbox" checked="checked"/>
                                <label for="checkboxG5" class="css-label">Option 2</label>
                               </div>

                                <div class="popup-row">
                                 <input type="checkbox" name="checkboxG6" id="checkboxG6" class="css-checkbox" />
                                <label for="checkboxG6" class="css-label">Option 1</label>
                               </div>

                             </div>
       
                           
                </permission-modal>
            
            
            
            
            
        </section>
    </div>
</template>

<style lang="sass">
@import "../assets/global.sass"

$light-grey-color: #eeeeee
$grey-text-color: #898989
$dark-grey-text-color: #555555
$light-border-color: #eeeeee

.documents-manager
    display: flex
    flex-direction: row
    height: 100%
    aside
        width: 200px
        height: 100%
        background-color: $light-grey-color
        color: $grey-text-color
        padding: $standard-padding
        box-sizing: border-box
        position: relative
        overflow-x: hidden
        flex-shrink: 0
        .profile-picture
            width: 70px
            height: 70px
            background: url(../assets/images/profile-picture.png) center center no-repeat
            border-radius: 50%
            background-size: cover
            border: 3px solid white
            margin: 0px auto $standard-padding auto
        .name
            text-align: center
            font-weight: bold
            font-size: 14px
            color: black
            margin-bottom: $standard-padding
        .overview
            border: 1px solid $grey-border-color
            border-left: 0
            border-right: 0
            font-size: 12px
            text-align: center
            padding: $standard-padding 0px
            margin-bottom: $standard-padding
            span
                font-weight: bold
                font-size: 14px
                color: black

        .menu
            list-style-type: none
            margin-bottom: $standard-padding
            li
                background: url(../assets/images/arrow.svg) no-repeat left center
                padding-left: $standard-padding
                font-weight: bold
                font-size: 14px
                line-height: 20px
                a
                    color: black
                    text-decoration: none

        .sign-out
            height: 34px
            border: 2px solid $grey-button-border-color
            border-radius: 6px
            background-color: transparent
            padding: 0px $standard-padding * 2
            font-weight: bold
            margin: 0px 0px 0px auto
            background: url(../assets/images/sign-out.svg) center center no-repeat
            width: 100%
            cursor: pointer
            &:active
                border-color: $blue-color
            &:hover
                border-color: $blue-color
                background-image: url(../assets/images/sign-out-focus.svg)

        footer
            color: $grey-text-color
            font-weight: bold
            text-align: center
            position: absolute
            left: 0px
            bottom: $standard-padding
            width: 100%
            font-size: 12px

    .content
        height: 100%
        flex: 1
        padding: $standard-padding
        box-sizing: border-box
        min-width: 450px
        background: white url(../assets/images/color-logo.svg) right bottom no-repeat
        background-position: right $standard-padding bottom $standard-padding
        position: relative
        header
            border-bottom: 1px solid $light-border-color
            padding-bottom: $standard-padding
            &:after
                display: block
                content: " "
                clear: both
            .add
                display: block
                width: 80px
                height: 34px
                border: 0
                background: $blue-color url(../assets/images/add.svg) center center no-repeat
                border-radius: 6px
                float: left
                margin-right: $standard-padding
                &:hover
                    cursor: pointer
            
                   
            
            .title
                float: right
                font-size: 20px
                color: $dark-grey-text-color
                margin-left: $standard-padding
                line-height: 38px
            .search
                width: 23px
                height: 36px
                border: 0
                // background: transparent url() center center no-repeat
                // background-color: red;
                mask: url(../assets/images/search.svg) center center no-repeat
                float: right
                position: relative
                z-index: 100
                &:hover, &.active
                    cursor: pointer
                    background-color: $blue-color
                    
            .edit
                width: 25px
                height: 25px
                border: 0
                // background: transparent url() center center no-repeat
                // background-color: red;
                mask: url(../assets/images/edit.svg) center center no-repeat
                float: right
               
                &:hover, &.active
                    cursor: pointer
                    background-color: $blue-color

            .search-field
                display: block
                float: right
                border-radius: 100px
                height: 34px
                width: 0px
                
                padding: 0px 0px 0px 36px
                margin-left: -30px
                transition: width 600ms ease
                border: 1px solid white
                &.active
                    border: 1px solid #00b4ff
                    width: 200px

        .documents
            padding: $standard-padding 0px
            box-sizing: border-box
            display: flex
            flex-direction: row
            flex-wrap: wrap
            .document
                width: 100px
                padding: 5px
                padding-top: 65px
                background: transparent url(../assets/images/document.svg) center 5px no-repeat
                margin-right: $standard-padding
                border: 1px solid transparent
                border-radius: 6px
                &:hover
                    border: 1px dashed $grey-button-border-color
                    cursor: pointer
                &.selected
                    border: 1px dashed $blue-color
                h4
                    text-align: center
                    font-size: 11px
                    margin-bottom: 5px
                    font-weight: bolder
                p
                    text-align: center
                    font-size: 9px
                    font-weight: bold
                    color: $grey-text-color
table
    border-collapse: collapse
    
    font-size: 12px
    width: 100%

    

th
  text-align: left
  background-color: #ceedfa
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#00b4ff+0,fff4f4+100 */
  background: #00b4ff /* Old browsers */
  background: -moz-linear-gradient(top, #00b4ff 0%, #fff4f4 100%) /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #00b4ff 0%,#fff4f4 100%) /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #00b4ff 0%,#fff4f4 100%) /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00b4ff', endColorstr='#fff4f4',GradientType=0 ) /* IE6-9 */
  height: 30px
  padding: 5px
  text-align: left
  border-bottom: 1px solid #ddd
  color:#274d5d

  td
    border: 1px solid black
    font-size: 12px
    width: 100%

td
  padding: 5px
  text-align: left
  border-bottom: 1px solid #ddd
  height: 12px
  vertical-align: center

tr
  &:hover
    background-color: #f5f5f5
  &:nth-child(even)
    background-color: #f2f2f2
                    
.dd
  border: 1px solid #ccc
  font-size: 16px
  height: 34px
  width: 100%   

input[type=checkbox].css-checkbox
  position: absolute
  z-index: -1000
  left: -1000px
  overflow: hidden
  clip: rect(0 0 0 0)
  height: 1px
  width: 1px
  margin: -1px
  padding: 0
  border: 0
  + label.css-label
    padding-left: 23px
    height: 18px
    display: inline-block
    line-height: 18px
    background-repeat: no-repeat
    background-position: 0 0
    font-size: 14px
    vertical-align: middle
    cursor: pointer
  &:checked + label.css-label
    background-position: 0 -18px

label.css-label
  background-image: url(http://csscheckbox.com/checkboxes/u/csscheckbox_001aa7bf6327f8fac80e0eb160776ef4.png)
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

.popup-box
  margin: 0px
  padding: 5px
  background: #eeeeee
  font: normal 16px Arial, Helvetica, sans-serif
  width: 91%
  color: #0698d5
  height: auto
  padding: 10px
  border: solid 1px #42b5e5

.popup-row
  width: 96%
  padding: 4px 
  margin: 4px 0 0 0
  background-color: #eeeeee
  border: solid 1px #d0d5d5
  




                
</style>


