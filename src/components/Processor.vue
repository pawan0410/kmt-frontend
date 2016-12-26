<script>
/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import $             from "jquery";
import Quill         from "quill";
import SmartKeyboard from "quill_smart_keyword";
import Select        from "quill-select";

import Vue                    from "vue";
import { mapGetters }         from "vuex";
import { mixin as clickaway } from "vue-clickaway";

import keywords from "../api/keywords";

import C from "../helpers";

/* Register smart keyword plugin. */
Quill.register( "modules/keyboard", SmartKeyboard );

/* Register select blot, in order to implement the partial suggestions engine. */
Quill.register( "formats/select", Select );

/**
 * Document procesSor Vue instance.
 * Main meat of the application, allows the user to process documents
 * and use keywords..
 * @type {Vue}
 * @namespace ProcessorVue
*/
export default {

    /**
     * Vue mixins.
     * @type     {Array}
     * @memberof ProcessorVue
     */
    mixins: [ clickaway ],

    /**
     * Computed properties.
     * @type     {Object}
     * @memberof ProcessorVue
     */
    computed: {
        ...mapGetters({
            user: "user",
            documents: "documents",
            loading: "loading",
            jwt  : "jwt",
            delta: "documentDelta",
            documentId: "documentId"
        })
    },

    /**
     * Local state generator.
     * @function data
     * @memberof ProcessorVue
     * @returns {Object} List of local state default values.
     */
    data() {
        return {

            /* Quill object. */
            quill: null,

            /* Flag to toggle Add link form. */
            addLink: false,

            /* Flag to toggle Add image form. */
            addImage: false,

            /* Flag to toggle color picker*/
            colorPicker: false,

            /* Flag to toggle Add partial suggestions form. */
            addPartialSuggestions: false,

            /* Flag to toggle document actions. */
            showActions: false,

            /* Flag to highlight bold button if the current selection has it. */
            isBold: false,

            /* Flag to highlight underline button if the current selection has it. */
            isUnderlined: false,

            /* Flag to highlight italic button if the current selection has it. */
            isItalic: false,

            /* Flag to highlight list button if the current selection has it. */
            listFormat: false,

            /* Flag to highlight align button if the current selection has it. */
            alignFormat: false,

            /* Link input in the Add link form. */
            linkUrl: "",

            /* List of colors available in the color picker. */
            colors: [
                "#00aeef", "#00ff00", "#ffff00", "#ff0000", "#ff59cd",
                "#c7c7c7", "#0072bc", "#9c5789", "#9c5789", "#00a651",
                "#0000ff", "#f7941d"
            ],

            /* Flag to toggle sidebar. */
            showSideBar:  false,

            gettingKeyword: false,

            keywordList: [],

            partialSuggestionsList: []
        };
    },


    /**
     * Called after the instance has just been mounted
     * @function mounted
     * @returns {void}
     * @memberof ProcessorVue
     */
    mounted: function () {
        this.$store.dispatch( "loading" );

        let store = this.$store;

        store.dispatch( "loadDocument", {
            token: this.jwt,
            documentId: this.$route.params.id
        }).then( () => {
            this.initQuill();

            store.dispatch( "loadingDone" );
        });

    },

    /**
     * List of methods used within the view.
     * @type {Object}
     * @memberof QuillComponentVue
     */
    methods: {
        // TODO: comment
        initQuill() {

            this.quill = new Quill( $( ".document", this.$el ).get( 0 ), {
                theme: "snow",
                modules: {
                    keyboard: {
                        getSuggestedKeywords: ( prefix, callback ) => {
                            if( prefix.length <= 2 )
                                return callback( [] );

                            if( this.gettingKeyword )
                                return callback( this.keywordList );

                            keywords.get({
                                token: this.jwt,
                                prefix: prefix,
                                callback: ( keywords ) => {
                                    this.gettingKeyword = false;
                                    this.keywordList = keywords;

                                    callback( this.keywordList );
                                },
                                errorCallback: () => {
                                    //  TODO: error handling.
                                    alert( "Error occurred!" );
                                }
                            });
                        },
                        getKeywordContent: ( keyword, callback ) => {
                            var store = this.$store;

                            store.dispatch( "loading" );

                            keywords.get({
                                token: this.jwt,
                                keyword: keyword,
                                callback: ( keywords ) => {
                                    C( "Keyword content loaded successfully!" );

                                    store.dispatch( "loadingDone" );

                                    let delta = null;

                                    /* No results. */
                                    if( keywords && keywords.length === 1 && keywords[ 0 ].delta ) {
                                        delta = JSON.parse( keywords[ 0 ].delta || "{}" );
                                    }

                                    callback( delta );

                                    return;
                                },
                                errorCallback: () => {
                                    //  TODO: error handling.
                                    alert( "Error occurred!" );

                                    store.dispatch( "loadingDone" );
                                }
                            });
                        }
                    },
                    toolbar: false,
                    history: {
                        delay: 2000,
                        maxStack: 500,
                    }
                }
            });

            let quill = this.quill;

            quill.on( Quill.events.EDITOR_CHANGE, ( type, range ) => {
                if ( type === Quill.events.SELECTION_CHANGE ) {
                    this.update( range );
                }
            });

            quill.updateContents( this.delta );


            this.setupPartialSuggestionsEngine();

            /**
             * This is necessary so that the use is not able to undo the Delta
             * update we just did in the previous line.
             */
            quill.history.clear();

            quill.focus();
        },

        // TODO: comment.
        setupPartialSuggestionsEngine() {
            let quill = this.quill;

            $( quill.root ).on( "change", "select", ( event ) => {
                quill.focus();

                let selectElement = event.target,
                    range = quill.getSelection(),
                    value = $( selectElement ).val();

                /* Do nothing. */
                if( !value )
                    return;

                /* Nothing is currently selected. */
                if( !range )
                    range = { index: 0 };

                C( range, -1 );

                let delta = quill.insertText( range.index, value );

                //  Set the cursor to the end of the inserted content.
                quill.setSelection( delta.length() + range.length );

                /* Simulate the smart keyword insertion mechanis, since it only gets fired if we manually type space. */
                range = quill.getSelection();

                quill.keyboard.smartKeyword( range, { prefix: value });

                quill.selection.scrollIntoView();
            });
        },

        // TODO: comment
        update( range ) {
            let formats = range == null ? {} : this.quill.getFormat( range );

            this.isBold = formats[ "bold" ];
            this.isItalic = formats[ "italic" ];
            this.isUnderlined = formats[ "underline" ];

            this.listFormat = formats[ "list" ] || false;

            this.alignFormat = formats[ "align" ] || "left";
        },

        /**
         * Focus and activate the cursor on the document.
         * @function focusEditor
         * @returns {void}
         * @memberof QuillComponentVue
         */
        focusEditor() {
            // this.quill.focus();
        },

        setBold() {
            this.isBold = !this.isBold;

            this.quill.format( "bold", this.isBold );
        },

        setItalic() {
            this.isItalic = !this.isItalic;

            this.quill.format( "italic", this.isItalic );
        },

        setUnderlined() {
            this.isUnderlined = !this.isUnderlined;

            this.quill.format( "underline", this.isUnderlined );
        },

        setList( type ) {
            if( this.listFormat == type )
                this.listFormat = false;
            else
                this.listFormat = type;

            this.quill.format( "list", this.listFormat );
        },

        setAlignLeft() {
            this.quill.format( "align", false );

            this.alignFormat = "left";
        },

        setAlignCenter() {
            this.quill.format( "align", "center" );

            this.alignFormat = "center";
        },

        setAlignRight() {
            this.quill.format( "align", "right" );

            this.alignFormat = "right";
        },

        setJustify() {
            this.quill.format( "align", "justify" );

            this.alignFormat = "justify";
        },

        toggleAddLink() {
            this.addLink = !this.addLink;

            if( !this.addLink )
                return;

            Vue.nextTick( () => {
                this.$refs.linkInput.focus();
            });
        },

        undo() {
            this.quill.history.undo();
        },

        redo() {
            this.quill.history.redo();
        },

        insertLink() {
            this.quill.format( "link", this.linkUrl );

            this.addLink = false;

            this.linkUrl = "";
        },

        // TODO: comment.
        setColor( color ) {
            this.quill.format( "color", color );

            this.colorPicker = false;
        },

        // TODO: comment.
        hideColorPicker() {
            this.colorPicker = false;
        },

        // TODO: comment.
        hideAddLink() {
            this.addLink = false;
        },

        // TODO: comment.
        hideAddImage() {
            this.addImage = false;
        },

        // TODO: comment.
        hideActions() {
            this.showActions = false;
        },

        // TODO: comment.
        save() {
            let store = this.$store;

            store.dispatch( "saveDocument", {
                token: this.jwt,
                documentId: this.documentId,
                delta: this.quill.getContents()
            });
        },

        // TODO: comment.
        toggleSideBar() {
            this.showSideBar = !this.showSideBar;
        },

        /**
         * Sign the user out!
         * @function signOut
         * @returns {void}
         */
        signOut() {
            this.$store.dispatch( "signOut" );
        },

        // TODO: comment.
        imageDropped( event ) {
            C( event, -1 );

            event.preventDefault();
        },

        // TODO: comment
        insertPartialSuggestions() {
            let quill = this.quill,
                range = quill.getSelection();

            if( this.partialSuggestionsList.length < 1 ) {
                alert( "Please add some values" );

                return;
            }

            if( !range ) {
                quill.setSelection( 0 );
                range = quill.getSelection();
            }

            quill.insertEmbed( range.index, "select", this.partialSuggestionsList );

            quill.setSelection( range.index + 1, Quill.sources.SILENT );

            this.partialSuggestionsList = [];

            this.addPartialSuggestions = false;
        },

        // TODO: comment.
        removePartialSuggestion( suggestion ) {
            let index = this.partialSuggestionsList.indexOf( suggestion );

            if( index !== -1 )
                this.partialSuggestionsList.splice( index, 1 );
        }
    },
};

</script>
<template>
<div class="document-processor">
    <aside v-bind:class="{ show: showSideBar }">
        <button class="menu-toggle" @click="toggleSideBar()"></button>

        <div class="profile-picture"></div>

        <h3 class="name">{{ user.name }}</h3>

        <div class="overview"><span>{{ documents.length }}</span> Documents</div>

        <ul class="menu">
            <li>
                <router-link :to="{ name: 'documents' }">My Documents</router-link>
            </li>
            
            <li><a href="">Backoffice</a></li>
        </ul>

        <button class="sign-out" @click="signOut()"></button>
    </aside>

    <header>
        <button class="menu-toggle" @click="toggleSideBar()"></button>

        <div class="container">
            <section class="styles">
                <button class="bold" @click="setBold()" v-bind:class="{ active: isBold }"></button>
                <button class="italic" @click="setItalic();" v-bind:class="{ active: isItalic }"></button>
                <button class="underlined" @click="setUnderlined();" v-bind:class="{ active: isUnderlined }"></button>
                <button class="list" @click="setList( 'bullet' );" v-bind:class="{ active: listFormat == 'bullet' }"></button>
                <button class="ordered-list" @click="setList( 'ordered' );" v-bind:class="{ active: listFormat == 'ordered' }"></button>
                <button class="align-left" @click="setAlignLeft();" v-bind:class="{ active: alignFormat == 'left' }"></button>
                <button class="align-center" @click="setAlignCenter();" v-bind:class="{ active: alignFormat == 'center' }"></button>
                <button class="align-right" @click="setAlignRight();" v-bind:class="{ active: alignFormat == 'right' }"></button>
                <button class="justify" @click="setJustify();" v-bind:class="{ active: alignFormat == 'justify' }"></button>
                
                <button class="link"
                        @click="toggleAddLink()"
                        v-on-clickaway="hideAddLink"></button>
                
                <button class="image"
                        @click="addImage = !addImage"
                        v-on-clickaway="hideAddImage"></button>
                
                <button class="color"
                        @click="colorPicker = !colorPicker"></button>
                
                <button class="select"
                        @click="addPartialSuggestions = !addPartialSuggestions"></button>

                <div class="choose-link"
                     v-bind:class="{ show: addLink }">

                    <input type="text" name="link" v-model="linkUrl" placeholder="http://www.example.com/" ref="linkInput" />
                    <button class="confirm" @click="insertLink()"></button>
                </div>

                <div class="upload-image"
                     v-bind:class="{ show: addImage }"
                     @dragover.prevent
                     @drop="imageDropped">
                    Drop Your<br/>Picture Here
                </div>

                <div class="color-picker"
                     v-bind:class="{ show: colorPicker }">
                    <button v-for="color in colors"
                            v-bind:style="{ backgroundColor: color }"
                            @click="setColor(color)">
                    </button>
                </div>

                <div class="add-partial-suggestions"
                     v-bind:class="{ show: addPartialSuggestions }">
                    
                    <div v-for="suggestion in partialSuggestionsList"
                         class="suggestion">
                        
                        <input type="text" name="title" class="title" placeholder="Title" v-model="suggestion.title" />
                        <input type="text" name="keyword" class="keyword" placeholder="Smart Keyword" v-model="suggestion.value" />
                        <button v-on:click="removePartialSuggestion( suggestion )">X</button>
                    </div>


                    <button class="insert-suggestion" @click="partialSuggestionsList.push({})"></button>

                    <button class="confirm" @click="insertPartialSuggestions()">Confirm</button>
                </div>
            </section>

            <section class="actions">
                <button class="undo" @click="undo()"></button>
                <button class="redo" @click="redo()"></button>
                <button class="more"
                        @click="showActions = !showActions"
                        v-on-clickaway="hideActions"></button>
                
                <ul class="options"
                    v-bind:class="{ show: showActions }">
                    <li class="save-document" @click="save()">Save</li>
                    <li class="export-document">Export</li>
                    <li class="save-template">Save as template</li>
                </ul>
            </section>
        </div>
    </header>


    <section class="document-container">
        <section class="document" 
                 @click="focusEditor()"></section>

        <footer>AIG Business © 2016</footer>
    </section>

    <div class="logo"></div>
</div>
</template>

<style lang="sass">
@import "../assets/global.sass"

$template-dark-grey: #515151

$blue-color: #00b4ff
$light-blue-color: #b2e8ff
$dark-blue-color: #0054a6
$grey-border-color: #d5d5d5
$light-grey-border-color: #ebebeb
$grey-color: #eeeeee
$grey-text-color: #898989

$standard-padding: 20px

$header-height: 40px
$document-width: 816px

.ql-align-left
    text-align: left
.ql-align-center
    text-align: center
.ql-align-right
    text-align: right
.ql-align-justify
    text-align: justify

.document-processor
    display: flex
    flex-direction: column
    height: 100%;
    aside
        $grey-text-color: #898989
        $grey-border-color: #c6c6c6
        $grey-button-border-color: #d0d0d0
        width: 200px + $standard-padding
        height: 100%
        background-color: $grey-color
        color: $grey-text-color
        padding: $standard-padding
        padding-left: 2 * $standard-padding /* Give enough space on the left side so that the bounce doesn't reveal what's behind. */
        box-sizing: border-box
        position: fixed
        top: 0px
        left: -$standard-padding
        overflow-x: hidden
        z-index: 100
        box-shadow: 2px 0px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
        display: none
        &.show
            display: block
            animation: bounceInLeft 600ms
        .menu-toggle
            background: url(../assets/images/menu.svg) top left no-repeat
            width: 20px
            height: 18px
            border: 0
            top: 11px
            right: -2px
            display: block
            position: absolute
            cursor: pointer
            &:hover
                background-image: url(../assets/images/menu-focus.svg)
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

    header
        flex: 0 0 auto;
        $style-button-width: 40px
        $style-button-height: 34px
        height: $header-height
        background-color: white
        border-bottom: 1px solid $grey-border-color
        .menu-toggle
            background: url(../assets/images/processor/menu.svg) top left no-repeat
            width: 20px
            height: 18px
            border: 0
            top: 11px
            left: -2px
            display: block
            position: absolute
            cursor: pointer
            &:hover
                background-image: url(../assets/images/menu-focus.svg)

        .container
            width: $document-width
            margin: 0px auto
            &:after
                display: block
                content: " "
                clear: both
            button
                border: 0
                width: $style-button-width
                height: $style-button-height
                background-position: center center
                background-repeat: no-repeat
                background-color: transparent
                margin: 3px 4px 0px 0px
                display: block
                border-radius: 3px

        .styles
            width: 13 * $style-button-width
            display: flex
            flex-direction: row
            float: left
            position: relative
            button
                &:hover
                    background-color: $grey-color
                    border-radius: 4px
                &.active
                    background-color: #ddfcff

            .bold
                background-image: url(../assets/images/processor/bold.svg)
            .italic
                background-image: url(../assets/images/processor/italic.svg)
            .underlined
                background-image: url(../assets/images/processor/underlined.svg)
            .list
                background-image: url(../assets/images/processor/list.svg)
            .ordered-list
                background-image: url(../assets/images/processor/ordered-list.svg)
            .align-left
                background-image: url(../assets/images/processor/align-left.svg)
            .align-center
                background-image: url(../assets/images/processor/align-center.svg)
            .align-right
                background-image: url(../assets/images/processor/align-right.svg)
            .justify
                background-image: url(../assets/images/processor/justify.svg)
            .link
                background-image: url(../assets/images/processor/link.svg)
            .image
                background-image: url(../assets/images/processor/image.svg)
            .color
                background-image: url(../assets/images/processor/color.svg)
            .select
                background-image: url(../assets/images/processor/select.svg)

            .choose-link
                display: none
                position: absolute
                top: 40px
                right: 120px
                width: 264px
                height: 40px
                padding: $standard-padding / 2
                box-sizing: border-box
                background-color: white
                box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
                list-style-type: none
                font-size: 14px
                font-weight: bold
                color: $grey-text-color
                z-index: 100
                border-radius: 3px
                text-align: center
                line-height: 30px
                input
                    width: 210px
                    height: 20px
                    padding: 0px 2px
                    border: 0
                    border-bottom: 3px solid $grey-border-color 
                    display: block
                    float: left
                button
                    display: block
                    border: 0
                    width: 20px
                    height: 20px
                    background: transparent url(../assets/images/processor/link/confirm-button.svg) center center no-repeat
                    float: left
                    margin-left: 10px
                    margin-right: 0px
                &.show
                    display: block
                    animation: bounceIn 400ms
                &:before
                    content: ""
                    position: absolute
                    width: 0
                    height: 0
                    margin-left: -0.5em
                    top: 2px
                    right: -2px
                    box-sizing: border-box
                    border: 6px solid black
                    border-color: transparent transparent white white
                    
                    transform-origin: 0 0
                    transform: rotate(135deg)
                    
                    box-shadow: -1px 1px 0px 0px rgba( 0, 0, 0, 0.1 )
               
            .upload-image
                display: none
                position: absolute
                top: 40px
                right: 80px
                width: 200px
                padding: $standard-padding * 2 $standard-padding
                background-color: white
                box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
                list-style-type: none
                font-size: 14px
                font-weight: bold
                color: $grey-text-color
                z-index: 100
                border-radius: 3px
                text-align: center
                line-height: 30px
                &.show
                    display: block
                    animation: bounceIn 400ms
                &:before
                    content: ""
                    position: absolute
                    width: 0
                    height: 0
                    margin-left: -0.5em
                    top: 2px
                    right: -2px
                    box-sizing: border-box
                    border: 6px solid black
                    border-color: transparent transparent white white
                    
                    transform-origin: 0 0
                    transform: rotate(135deg)
                    
                    box-shadow: -1px 1px 0px 0px rgba( 0, 0, 0, 0.1 )

            .color-picker
                display: none
                $button-width: 20px
                $padding: 10px
                position: absolute
                top: 40px
                right: 40px
                width: $button-width * 4 + ( $padding * 3 )
                padding: $padding
                background-color: white
                box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
                list-style-type: none
                font-size: 12px
                font-weight: bold
                color: $grey-text-color
                z-index: 100
                border-radius: 3px
                &.show
                    display: block
                    animation: bounceIn 400ms
                &:before
                    content: ""
                    position: absolute
                    width: 0
                    height: 0
                    margin-left: -0.5em
                    top: 2px
                    right: -2px
                    box-sizing: border-box
                    border: 6px solid black
                    border-color: transparent transparent white white
                    
                    transform-origin: 0 0
                    transform: rotate(135deg)
                    
                    box-shadow: -1px 1px 0px 0px rgba( 0, 0, 0, 0.1 )
                button
                    width: $button-width
                    height: $button-width
                    border-radius: 50%
                    float: left
                    display: block
                    border: 0
                    margin: 0px $padding $padding 0px
                    &:hover
                        cursor: pointer
                    &:nth-child( 4n+4 )
                        margin-right: 0
                    &:nth-child( n+9 )
                        margin-bottom: 0

            .add-partial-suggestions
                display: none
                position: absolute
                top: 40px
                right: 0px
                width: 300px
                padding: $standard-padding $standard-padding
                background-color: white
                box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
                list-style-type: none
                font-size: 14px
                font-weight: bold
                color: $grey-text-color
                z-index: 100
                border-radius: 3px
                text-align: center
                line-height: 30px
                .suggestion
                    overflow: auto
                    margin-bottom: 20px
                    &:after
                        display: block
                        content: " "
                        clear: both
                    button
                        width: 30px
                        height: 30px
                        line-height: 30px
                        margin: 0px
                        font-weight: bold
                    input
                        display: block
                        float: left
                        width: 150px
                        height: 30px
                        padding: 0px 2px
                        border: 0
                        border-bottom: 3px solid $grey-border-color
                        margin-right: 6px
                        &.keyword
                            width: 100px

                .insert-suggestion
                    float: left
                    display: block
                    border: 0
                    width: 20px
                    height: 20px
                    background: #00b4ff url(../assets/images/add.svg) center center no-repeat
                    display: block
                    width: 80px
                    height: 34px
                    border-radius: 3px
                    &:hover
                        cursor: pointer

                .confirm
                    display: block
                    border: 2px solid $grey-button-border-color
                    width: 90px
                    height: 34px
                    background: transparent url(../assets/images/processor/link/confirm-button.svg) 6px center no-repeat
                    float: right
                    margin-left: 10px
                    margin-right: 0px
                    padding-left: 20px
                    border-radius: 4px
                    &:hover
                        cursor: pointer

                &.show
                    display: block
                    animation: bounceIn 400ms
                &:before
                    content: ""
                    position: absolute
                    width: 0
                    height: 0
                    margin-left: -0.5em
                    top: 2px
                    right: -2px
                    box-sizing: border-box
                    border: 6px solid black
                    border-color: transparent transparent white white
                    
                    transform-origin: 0 0
                    transform: rotate(135deg)
                    
                    box-shadow: -1px 1px 0px 0px rgba( 0, 0, 0, 0.1 )

        .actions
            width: 3 * $style-button-width + ( $standard-padding * 1.5 )
            display: flex
            flex-direction: row
            float: right
            position: relative
            .more
                background-image: url(../assets/images/processor/more.svg)
                margin-left: $standard-padding
                &:hover
                    cursor: pointer
            .undo
                background-image: url(../assets/images/processor/undo.svg)
            .redo
                background-image: url(../assets/images/processor/redo.svg)
                opacity: 0.2
                margin-left: $standard-padding / 2
            .undo:hover, .redo:hover
                background-color: $grey-color
                border-radius: 4px
            .options
                display: none
                position: absolute
                top: 40px
                right: 0px
                width: 170px
                background-color: white
                box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
                list-style-type: none
                font-size: 12px
                font-weight: bold
                color: $grey-text-color
                z-index: 100
                border-radius: 3px
                &.show
                    display: block
                    animation: bounceIn 400ms

                li
                    height: $header-height
                    line-height: $header-height
                    border-bottom: 1px solid $light-grey-border-color
                    margin: 0px 10px
                    padding-left: $header-height
                    background-position: 2px center
                    background-repeat: no-repeat
                    &:hover
                        color: $blue-color
                        cursor: pointer
                    &.save-document
                        background-image: url(../assets/images/processor/actions/save-document.svg)
                            background-position: 3px center
                    &.export-document
                        background-image: url(../assets/images/processor/actions/export-document.svg)
                        background-position: 3px center
                    &.save-template
                        background-image: url(../assets/images/processor/actions/save-template.svg)
                        background-position: 5px center

                &:before
                    content: ""
                    position: absolute
                    width: 0
                    height: 0
                    margin-left: -0.5em
                    top: 2px
                    right: -2px
                    box-sizing: border-box
                    border: 6px solid black
                    border-color: transparent transparent white white
                    
                    transform-origin: 0 0
                    transform: rotate(135deg)
                    
                    box-shadow: -1px 1px 0px 0px rgba( 0, 0, 0, 0.1 )

    .document-container
        flex: 1 1 auto
        position: relative
        overflow-y: auto
        padding: $standard-padding
        .document
            width: $document-width
            background-color: white
            border-radius: 2px
            margin: 0 auto
            min-height: $document-width * 1.5
            box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
            padding: 76px
            box-sizing: border-box
            font-size: 14px
            position: relative
            .ql-editor
                min-height: $document-width * 1.5
                line-height: 24px
            select
                display: inline-block
                margin: auto 10px
            a
                color: $blue-color !important
                font-weight: bold
                text-decoration: none
            input, select
                border: 0
                height: 24px
                line-height: 24px
                border-bottom: 3px solid $light-grey-border-color
                color: $dark-blue-color
                font-weight: bold
                padding: 0px 5px
                display: inline-block
            ol
                counter-reset: item
                li
                    display: block
                    &:before 
                        content: counter( item ) ". "
                        counter-increment: item
                        color: $dark-blue-color
                        font-weight: bold

            ul
                list-style-type: square
                margin-left: 20px
            .ql-indent-1
                margin-left: $standard-padding
            .ql-indent-2
                margin-left: $standard-padding * 2
            .ql-indent-3
                margin-left: $standard-padding * 3
            .ql-indent-4
                margin-left: $standard-padding * 4
            .ql-indent-5
                margin-left: $standard-padding * 5
            .ql-indent-6
                margin-left: $standard-padding * 6
            .ql-indent-7
                margin-left: $standard-padding * 7
            .ql-indent-8
                margin-left: $standard-padding * 8
            .ql-clipboard
                display: none
            .suggestions-container
                background-color: #e1e1e1
                display: none
                position: absolute
                p
                    padding: 0px
                    padding: 5px 10px
                    margin: 0px
                    &.selected
                        background-color: #ccc               

        footer
            margin-top: $standard-padding
            color: $grey-text-color
            font-weight: bold
            text-align: center
            width: 100%
            font-size: 12px

    .logo
        background: transparent url(../assets/images/color-logo.svg) top left no-repeat
        width: 87px
        height: 109px
        position: fixed
        bottom: $standard-padding
        right: $standard-padding
</style>
