<script>
/* © AIG Business. See LICENSE file for full copyright & licensing details. */

/**
 * Instantiates the Quilljs editor on the component itself.
 * @type {Vue}
 * @namespace SmallModalComponentVue
*/
export default {
    props: [ "title" ],
};
</script>
<template>
    <transition name="appear">
        <div class="small-modal">
            <div class="form">
                <h3>{{ title }}</h3>

                <button class="close" @click="$emit( 'close' )"></button>

                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<style lang="sass">
@import "../../assets/global.sass"

.small-modal
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    height: 100%
    background-color: rgba( 0, 0, 0,0.5 )
    z-index: 100
    .form
        $form-width: 300px
        $form-height: 140px
        background-color: white
        position: absolute
        top: $standard-padding
        left: $standard-padding
        padding: $standard-padding
        border-radius: 4px
        width: $form-width
        height: $form-height
        p
            margin-bottom: 10px
        h3
            margin-bottom: 20px
            color: $blue-color
        .close
            position: absolute
            top: $standard-padding
            right: $standard-padding
            width: 20px
            height: 20px
            mask: url(../../assets/images/add.svg) center center no-repeat
            background-color: $blue-color
            background-size: cover
            border: 0px
            transform: rotateZ( 45deg )
            &:hover
                cursor: pointer
        input
            display: block
            border: 0
            font-size: 14px
            &[type="text"]
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
</style>
