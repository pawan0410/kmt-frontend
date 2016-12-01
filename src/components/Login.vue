<script>
/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import { mapGetters } from "vuex";

import auth   from "../api/auth";
import C      from "../helpers";

/**
 * Login Vue instance.
 * Provides a login form for the user to get authenticated.
 * @type {Vue}
 * @namespace LoginVue
*/
export default {

    /**
     * Local state generator.
     * @function data
     * @memberof LoginVue
     * @returns {Object} List of local state default values.
     */
    data: () => {

        /* Get the last email we logged in with. */
        let lastEmail = localStorage.getItem( "lastEmail" );

        return {
            email: lastEmail,
            password: "",
            loginErrorMessage: "",
            loginSuccess: false,
            working: false
        };
    },

    /**
     * Computed properties.
     * @type {Object}
     * @memberof LoginVue
     */
    computed: {
        ...mapGetters({
            companyName: "companyName",
            copyrightYear: "copyrightYear",
            lastEmail: "lastEmail",
            authenticated: "authenticated"
        })
    },

    /**
     * List of methods used within the view.
     * @type {Object}
     * @memberof LoginVue
     */
    methods: {

        /**
         * When the user clicks the login button, we call this method.
         * @function authenticate
         * @param {String} email Email provided by the user..
         * @param {String} password password provided by the user
         * @returns {void}
         */
        authenticate( email, password ) {

            /* To avoid button spamming. */
            if( this.working )
                return;

            C( "Authenticating..." );

            let store = this.$store;

            /* Turn on the loader and reset the login error message. */
            this.working = true;
            this.loginErrorMessage = "";

            if( email )
                localStorage.setItem( "lastEmail", email );

            /* Execute API authentication. */
            auth.authenticate(
                { email, password },

                /* Success callback */
                ( data ) => {

                    /* Show the success icon. */
                    this.loginSuccess = true;

                    /**
                     * Save the authentication token to the App state and
                     * redirect to the documents manager.
                     */
                    store.dispatch( "authenticationDone", {
                        token: data.token,
                        routeName: "documents"
                    });
                },

                /* Failure callback. */
                ( data ) => {
                    C( "Authentication failed!", false, 1 );

                    /* Disable the loader and display returned errors. */
                    this.working = false;
                    this.loginErrorMessage = data.error;
                }
            );
        }
    }
};
</script>

<template>
<div class="container">
    <section class="splash"></section>

    <section class="form">
        <div class="user"></div>

        <input type="text" name="email" placeholder="Email" v-model="email" @keyup.enter="authenticate( email, password )" />
        <input type="password" name="password" placeholder="Password" v-model="password" @keyup.enter="authenticate( email, password )" />

        <button type="submit" @click="authenticate( email, password )">Sign In</button>

        <div class="error">{{ loginErrorMessage }}</div>

        <footer>{{ companyName }} © {{ copyrightYear }}</footer>

        <div class="working" v-show="working">
            <div class="success" v-if="loginSuccess" v-bind:class="{ grow: loginSuccess }"></div>
            <div class="animation" v-else></div>
        </div>
    </section>
</div>
</template>

<style lang="sass">
$blue-color: #00b4ff
$grey-border-color: #ebebeb
$standard-padding: 20px
$dark-grey-color: #515151
$grey-button-border-color: #dddddd
$grey-text-color: #acacac

*
    margin: 0px
    padding: 0px
    outline: none

body, html
    width: 100%
    height: 100%
    background-color: #eaeaea

input, body, button
    font-family: "Open Sans", sans-serif

@keyframes ripple-animation
    from
        transform: scale( 1 )
        opacity: 0.4
    to
        transform: scale( 100 )
        opacity: 0
        display: none

.ripple
    overflow: hidden
    position: relative

.ripple-effect
    position: absolute
    border-radius: 50%
    width: 50px
    height: 50px
    background: white
    animation: ripple-animation 1s forwards

.container
    $login-container-width: 660px
    $login-container-height: 400px
    width: $login-container-width
    height: $login-container-height
    display: flex
    flex-direction: row
    position: absolute
    top: 50%
    left: 50%
    margin: -( $login-container-height / 2 ) 0px 0px ( -$login-container-width / 2 )
    border-radius: 6px
    overflow: hidden
    box-shadow: 0px 1px 1px 0px rgba( 0, 0, 0, 0.33 )
    .splash
        width: $login-container-height
        background-color: $blue-color
        background-image: url(../assets/images/logo.svg), linear-gradient(135deg,  rgba( 24, 255, 209, 0.6 ) 0%, rgba( 0, 180, 255, 0.6 ) 100% )
        background-position: center center
        background-repeat: no-repeat
    .form
        width: $login-container-width - $login-container-height /* Splash is a square of #login-container-height size. */
        background-color: white
        padding: $standard-padding
        box-sizing: border-box
        position: relative
        .user
            width: 68px
            height: 80px
            margin: $standard-padding auto
            background: url(../assets/images/user.svg) center center no-repeat
            margin-bottom: $standard-padding * 2
        .error
            font-size: 12px
            font-weight: bold
            text-align: center
            color: #f6465b
            margin-top: 10px
        input
            display: block
            border: 0
            font-size: 14px
            &[type="text"], &[type="password"]
                height: 24px
                line-height: 24px
                border-bottom: 3px solid $grey-border-color 
                width: 100%
                margin-bottom: $standard-padding * 1.5
            &:focus
                border-color: $blue-color

        button
            display: block
            &[type="submit"]
                height: 34px
                border: 2px solid $grey-button-border-color
                border-radius: 6px
                background-color: white
                padding: 0px $standard-padding * 2
                font-weight: bold
                margin: 0px 0px 0px auto
                &:active
                    border-color: $blue-color
        ::placeholder
            color: $dark-grey-color
            font-weight: bold
        ::-moz-placeholder
            color: $dark-grey-color
            font-weight: bold
        ::-webkit-input-placeholder
            color: $dark-grey-color
            font-weight: bold

        footer
            color: $grey-text-color
            font-weight: bold
            text-align: center
            position: absolute
            left: 0px
            bottom: $standard-padding
            width: 100%
            font-size: 12px
        .working
            position: absolute
            width: 100%
            height: 100%
            top: 0px
            left: 0px
            background-color: rgba( 0, 0, 0, 0.6 )
            .animation, .success
                width: 40px
                height: 40px
                position: absolute
                top: 50%
                left: 50%
                margin-top: -20px
                margin-left: -20px
                background-size: contain !important
            .animation
                background: url(../assets/images/working.svg) center center no-repeat
            .success
                background: url(../assets/images/success.svg) center center no-repeat
                &.grow
                    transition: all 500ms ease-in-out
</style>