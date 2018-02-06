'use strict';

const loadTemplate = function ( option, callback ) {
    const { template, autoInsertTemplate, el } = option;

    switch ( typeof template ) {
        case 'string': {
            autoInsertTemplate ? el.innerHTML = template : void 0;
            break;
        }
        case 'function': {
            template( ).then( ( _template ) => {
                option.template = _template;
                autoInsertTemplate ? el.innerHTML = _template( ) : void 0;
            } );
            break;
        }
    }

    setTimeout( ( ) => {
        callback();
    }, 0 );
}

module.exports = ( option ) => ( ) => new Promise( ( resolve, reject ) => {
    loadTemplate( option, resolve );
} );
