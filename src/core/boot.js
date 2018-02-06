'use strict';

import loadResources from './load_resources';
import loadTemplate from './load_template';
import loadEntry from './load_entry';

module.exports = function ( option ) {
    option.beforeLoad ? option.beforeLoad( option ) : void 0;

    loadResources( option )
        .then( loadTemplate( option ) )
        .then( loadEntry( option ) )
        .then( ( ) => {
            option.loaded ? option.loaded( option ) : void 0;
        } )
};
