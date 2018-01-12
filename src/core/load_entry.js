'use strict';

import util from './lib/util';

const loadEntry = function ( option, callback ) {
    const { entry } = option;

    if ( !entry ) {
        callback();

        return void 0;
    }

    switch ( typeof entry ) {
        case 'string': {
            util.loadScript( {
                url: entry,
                callback,
            } );
            break;
        }
        case 'function': {
            entry( ).then( ( _entry ) => {
                option.entry = _entry;
                callback( );
            } )
            break;
        }
    }
}

module.exports = ( option ) => ( ) => new Promise( ( resolve, reject ) => {
    loadEntry( option, resolve );
} );
