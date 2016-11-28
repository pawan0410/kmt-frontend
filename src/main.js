import $ from "jquery";

import Quill from "quill";

import Vue from "vue";

import App from "./components/App";

/* eslint-disable no-new */
new Vue({
    el: "#app",
    render: ( h ) => h( App )
});

var quill = new Quill( "#processor-document", {
    theme: "snow",
    modules: {
        toolbar: false,
        keyboard: {
            getSuggestedKeywords: function( prefix, callback ) {
                var keywords = [
                    ".questions", ".question", ".queries", ".quotation", ".quality", ".quantity",
                    ".test", ".testing", ".testimonial", ".proverb", ".aig",
                    ".validation", ".values", ".varieties", ".volumes", ".vaccine",
                    ".food", ".fork", ".programming", ".job", ".users", ".application",
                    ".solution", ".company", ".business", ".bus", ".borders", ".bacteria",
                    ".keyword", ".keywords", ".class", ".clues", ".clever", ".classification",
                    ".manager"
                ];

                var filtered = keywords.filter( function( keyword ) {
                    return keyword.startsWith( prefix );
                });

                callback( filtered );
            },
            getKeywordContent: function() {
                return false;
            },
            suggestionsContainer: $( "#suggestion-list" ).get( 0 )
        }
    }
});

$( "#processor-document" ).click( function() {
    quill.root.focus();
});

$( ".styles .bold" ).click( function() {
    quill.format( "bold", true );
});

$( ".styles .italic" ).click( function() {
    quill.format( "italic", true );
});

$( ".styles .underlined" ).click( function() {
    quill.format( "underline", true );
});

$( ".styles .list" ).click( function() {
    quill.format( "list", "bullet" );
});

$( ".styles .ordered-list" ).click( function() {
    quill.format( "list", "ordered" );
});

$( ".styles .align-left" ).click( function() {
    quill.format( "align", false );
});

$( ".styles .align-center" ).click( function() {
    quill.format( "align", "center" );
});

$( ".styles .align-right" ).click( function() {
    quill.format( "align", "right" );
});

$( ".styles .justify" ).click( function() {
    quill.format( "align", "justify" );
});

$( "#choose-link .confirm" ).click( function() {
    quill.format( "link", $( "#choose-link [name='link']" ).val() );
    $( "#choose-link" ).removeClass( "show" );
});

/* Eelemnt click ripple effect. */
function ripple() {
    $( ".ripple" ).on( "click", function ( event ) {
        event.preventDefault();

        let self = $( this ),
            $div = $( "<div class='ripple-effect'/>" ),
            offset = self.offset(),
            x = event.pageX - offset.left,
            y = event.pageY - offset.top,
            width = self.width(),
            height = self.height();

        $div.css({
            height: height,
            width: width,
            top: y - ( height / 2 ),
            left: x - ( width / 2 ),
            background: self.data( "ripple-color" )
        }).appendTo( self );

        window.setTimeout( function() {
            $div.remove();
        }, 1400 );
    });
}

function moreOptions() {
    $( "#options" ).toggleClass( "show" );
}

function menu() {
    $( "aside" ).toggleClass( "show" );
}

function colorPicker() {
    $( "#color-picker" ).toggleClass( "show" );
}

function imageStyle() {
    $( "#upload-image" ).toggleClass( "show" );
}

function linkStyle() {
    $( "#choose-link" ).toggleClass( "show" );
}

( function( window, $ ) {
    $( function() {
        $( ripple );
        $( "#more" ).on( "click", moreOptions );
        $( ".menu-toggle" ).on( "click", menu );
        $( "#color-style" ).on( "click", colorPicker );
        $( "#image-style" ).on( "click", imageStyle );
        $( "#link-style" ).on( "click", linkStyle );
    });
})( window,  $ );
