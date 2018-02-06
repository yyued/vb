'use strict';

import util from './lib/util';

const loadResources = function ( { resources }, callback ) {
    if ( !resources || resources.length <= 0 ) {
        callback();

        return void 0;
    }

    const load = { };

    let loaded = 0;

    Object.defineProperty( load, 'loaded', {
        get ( ) {
            return loaded;
        },
        set ( value ) {
            loaded = value;

            loaded === resources.length ? callback( ) : void 0;
        }
    });

    resources.forEach( ( item, index ) => {
        util.loadResources( {
            url: item,
            callback: ( ) => {
                ++load.loaded;
            }
        } );
    } );
}

module.exports = function ( option ) {
    return new Promise( ( resolve, reject ) => {
        loadResources( option, resolve );
    } );
};
