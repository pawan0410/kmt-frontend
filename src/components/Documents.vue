<script>
/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import { mapGetters } from "vuex";

import C    from "../helpers";

/**
 * Document manager Vue instance.
 * Displays the user's documents.
 * @type {Vue}
 * @namespace DocumentsVue
*/
export default {

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
         * Open clicked document to be edited.
         * @function openDocument
         * @param   {Object} document The document that the user clicked.
         * @returns {void}
         */
        openDocument( document ) {
            C( "Clicked!" );
            return document;
        },

        /**
         * Sign the user out!
         * @function signOut
         * @returns {void}
         */
        signOut() {
            this.$store.dispatch( "signOut" );
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
    <div class="manager">
        <aside>
            <button class="menu-toggle"></button>

            <div class="profile-picture"></div>

            <h3 class="name">{{ user.name }}</h3>

            <div class="overview"><span>{{ documents.length }}</span> Documents</div>

            <ul class="menu">
            <li><a href="">My Documents</a></li>
            <li><a href="">Backoffice</a></li>
            </ul>

            <button class="sign-out" @click="signOut()"></button>

            <footer>{{ companyName }} © {{ copyrightYear }}</footer>
        </aside>

        <section class="content">
            <header>
                <button class="add"></button>
                <button class="delete"></button>

                <h2 class="title">My Documents</h2>

                <button class="search"></button>
            </header>

            <section class="documents">
                <div v-for="document in documents" class="document" :key="document.id" @click="openDocument(document)">
                    <h4>{{ document.name }}</h4>
                    <p>{{ document.update_time }}</p>
                </div>
            </section>
        </section>
    </div>
</template>

<style lang="sass">
$blue-color: #00b4ff
$light-grey-color: #eeeeee
$grey-border-color: #c6c6c6
$grey-text-color: #898989
$dark-grey-text-color: #555555
$grey-button-border-color: #d0d0d0
$light-border-color: #eeeeee

$standard-padding: 20px

.manager
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
        .menu-toggle
            background: url(../assets/images/menu.svg) top left no-repeat
            width: 20px
            height: 18px
            border: 0
            top: $standard-padding + 8px
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

    .content
        height: 100%
        flex: 1
        padding: $standard-padding
        box-sizing: border-box
        min-width: 450px
        background: white url(../assets/images/color-logo.svg) right bottom no-repeat
        background-position: right $standard-padding bottom $standard-padding
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
            .delete
                width: 20px
                height: 34px
                border: 0
                background: transparent url(../assets/images/delete.svg) center center no-repeat
                float: left

            .title
                float: right
                font-size: 20px
                color: $dark-grey-text-color
                margin-left: $standard-padding
            .search
                width: 23px
                height: 34px
                border: 0
                background: transparent url(../assets/images/search.svg) center center no-repeat
                float: right

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

</style>