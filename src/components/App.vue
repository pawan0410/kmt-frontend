<template>
<div id="app">
    <aside>
        <button class="menu-toggle"></button>

        <div class="profile-picture"></div>

        <h3 class="name">Irfan Khan</h3>

        <div class="overview"><span>6</span> Documents</div>

        <ul class="menu">
            <li><a href="manager.html">My Documents</a></li>
            <li><a href="">Backoffice</a></li>
        </ul>

        <button class="sign-out"></button>
    </aside>

    <header>
        <button class="menu-toggle"></button>

        <div class="container">
            <section class="styles">
                <button class="bold"></button>
                <button class="italic"></button>
                <button class="underlined"></button>
                <button class="list"></button>
                <button class="ordered-list"></button>
                <button class="align-left"></button>
                <button class="align-center"></button>
                <button class="align-right"></button>
                <button class="justify"></button>
                <button class="link" id="link-style"></button>
                <button class="image" id="image-style"></button>
                <button class="color" id="color-style"></button>
                <button class="block"></button>

                <div id="choose-link">
                    <input type="text" name="link" placeholder="http://www.example.com/" /> <button class="confirm"></button>
                </div>

                <div id="upload-image">
                    Drop Your<br/>Picture Here
                </div>

                <div id="color-picker">
                    <button class="color-1"></button>
                    <button class="color-2"></button>
                    <button class="color-3"></button>
                    <button class="color-4"></button>
                    <button class="color-5"></button>
                    <button class="color-6"></button>
                    <button class="color-7"></button>
                    <button class="color-8"></button>
                    <button class="color-9"></button>
                    <button class="color-10"></button>
                    <button class="color-11"></button>
                    <button class="color-12"></button>
                </div>
            </section>

            <section class="actions">
                <button class="undo"></button>
                <button class="redo"></button>
                <button class="more" id="more"></button>
                <ul id="options">
                    <li class="new-document">New</li>
                    <li class="open-document">Open</li>
                    <li class="export-document">Export</li>
                    <li class="save-template">Save as template</li>
                    <li class="restructure-document">Restructure</li>
                </ul>
            </section>
        </div>
    </header>


    <section class="document-container">
        <section class="document" id="processor-document">
            <p>We write to taste <b><u>life</u></b> twice, in the moment and in <i>retrospect</i>.</p>

            <br/>

            <ol>
                <li>First</li>
                <li>Second</li>
                <li>Third</li>
            </ol>

            <br/>

            <ul>
                <li>A Sentence</li>
                <li>Another one</li>
                <li>And then the last one</li>
            </ul>
            <br/>
            <p><center>This is a centered paragraph, with a link to <a href="http://en.wikipedia.org/" target="_blank">Wikipedia’s</a> front page.</center></p>
            <br/>
            <p>This an embeded picture of a kitten</p>
            <br/>
        </section>

        <footer>AIG Business © 2016</footer>
    </section>

    <div class="logo"></div>
</div>
</template>

<script>
export default {
    name: "app",
    components: {}
};

</script>

<style lang="sass">
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

*
    margin: 0px
    padding: 0px
    outline: none

@keyframes bounceIn
    from, 20%, 40%, 60%, 80%, to
        animation-timing-function: cubic-bezier( 0.215, 0.610, 0.355, 1.000 )

    0%
        opacity: 0
        transform: scale3d( .3, .3, .3 )

    20%
        transform: scale3d( 1.1, 1.1, 1.1 )

    40%
        transform: scale3d( .9, .9, .9 )

    60%
        opacity: 1
        transform: scale3d( 1.03, 1.03, 1.03 )

    80%
        transform: scale3d( .97, .97, .97 )

    to
        opacity: 1
        transform: scale3d(1, 1, 1)

@keyframes bounceInLeft
    from, 60%, 75%, 90%, to
        animation-timing-function: cubic-bezier( 0.215, 0.610, 0.355, 1.000 )

    0%
        opacity: 0;
        transform: translate3d( -3000px, 0, 0 )

    60%
        opacity: 1
        transform: translate3d( 25px, 0, 0 )

    75%
        transform: translate3d( -10px, 0, 0 )

    90%
        transform: translate3d( 5px, 0, 0 )

    to
        transform: none

body, html
    width: 100%
    height: 100%
    background-color: $grey-color

input, body, button, select
    font-family: "Open Sans", sans-serif

body
    display: flex
    flex-direction: column

.ql-align-left
    text-align: left
.ql-align-center
    text-align: center
.ql-align-right
    text-align: right
.ql-align-justify
    text-align: justify

aside
    $grey-text-color: #898989
    $grey-border-color: #c6c6c6
    $grey-button-border-color: #d0d0d0
    width: 200px - $standard-padding
    height: 100%
    background-color: $grey-color
    color: $grey-text-color
    padding: $standard-padding
    padding-left: 2 * $standard-padding /* Give enough space on the left side so that the bounce doesn't reveal what's behind. */
    // box-sizing: border-box
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
            margin-top: 3px
            display: block

    .styles
        width: 13 * $style-button-width
        display: flex
        flex-direction: row
        float: left
        position: relative
        button:hover
            background-color: $grey-color
            border-radius: 4px
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

        #choose-link
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
           
        #upload-image
            display: none
            position: absolute
            top: 40px
            right: 80px
            width: 130px
            padding: $standard-padding
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

        #color-picker
            $button-width: 20px
            $padding: 10px
            display: none
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
                &.color-1
                    background-color: #00aeef
                &.color-2
                    background-color: #00ff00
                &.color-3
                    background-color: #ffff00
                &.color-4
                    background-color: #ff0000
                &.color-5
                    background-color: #ff59cd
                &.color-6
                    background-color: #c7c7c7
                &.color-7
                    background-color: #0072bc
                &.color-8
                    background-color: #9c5789
                &.color-9
                    background-color: #9c5789
                &.color-10
                    background-color: #00a651
                &.color-11
                    background-color: #0000ff
                &.color-12
                    background-color: #f7941d


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
        #options
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
                &.new-document
                    background-image: url(../assets/images/processor/actions/new-document.svg)
                &.open-document
                    background-image: url(../assets/images/processor/actions/open-document.svg)
                    background-position: 0px center
                &.export-document
                    background-image: url(../assets/images/processor/actions/export-document.svg)
                &.save-template
                    background-image: url(../assets/images/processor/actions/save-template.svg)
                    background-position: 5px center
                &.restructure-document
                    background-image: url(../assets/images/processor/actions/restructure-document.svg)
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
    flex: 1
    overflow-y: scroll
    padding: $standard-padding
    .document
        width: $document-width
        background-color: white
        border-radius: 2px
        margin: 0 auto
        height: $document-width * 1.5
        box-shadow: 0px 2px 4.15px 0.85px rgba( 0, 0, 0, 0.2 )
        padding: 76px
        box-sizing: border-box
        font-size: 14px
        position: relative
        a
            color: $blue-color
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
        ul, ol
            li
              &.ql-indent-1
                margin-left: 2em
              &.ql-indent-2
                margin-left: 4em
              &.ql-indent-3
                margin-left: 6em
              &.ql-indent-4
                margin-left: 8em
              &.ql-indent-5
                margin-left: 10em
              &.ql-indent-6
                margin-left: 12em
              &.ql-indent-7
                margin-left: 14em
              &.ql-indent-8
                margin-left: 16em
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
