/* © AIG Business. See LICENSE file for full copyright & licensing details. */

import Quill         from "quill";

let Parchment = Quill.import( "parchment" );

// TODO: comment.
class IndentAttributor extends Parchment.Attributor.Style {
    add( node, value ) {
        if( value === "+1" || value === "-1" ) {
            let indent = this.value( node ) || 0;
            value = ( value === "+1" ? ( indent + 20 ) : ( indent - 20 ) );
        }

        if( value === 0 ) {
            this.remove( node );
            return true;
        } else {
            return super.add( node, value + "px" );
        }
    }

    canAdd( node, value ) {
        return super.canAdd( node, value ) || super.canAdd( node, parseInt( value ) );
    }

    value( node ) {
        return parseInt( super.value( node ) ) || undefined;  // Don't return NaN
    }
}

let IndentClass = new IndentAttributor( "indent", "margin-left", {
    scope: Parchment.Scope.BLOCK,
    whitelist: [ 20, 40, 60, 80, 100, 120, 140, 160 ]
});

export {
    IndentClass
};
