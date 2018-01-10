'use strict';

const util = { };

const loadResourcesErrorHandle = ( { url } ) => {
    return ( ) => {
        console.error( `"${ url }" error`);
    };
}

const loadResourcesSuccessHandle = ( { url, callback } ) => {
    return ( ) => {
        callback( );
    };
}

util.loadScript = ( args ) => {
    const { url, callback } = args;

    const script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );

    script.onload = loadResourcesSuccessHandle( args );
    script.onerror = loadResourcesErrorHandle( args );
};

util.loadStyle = ( args ) => {
    const { url, callback } = args;

    const style = document.createElement( 'link' );
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = url;
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );

    style.onload = loadResourcesSuccessHandle( args );
    style.onerror = loadResourcesErrorHandle( args );
};

// TODO: load image resources
util.loadResources = ( { url, callback } ) => {
    if ( typeof url !== 'string' ) {
        const { filter } = url;

        if ( filter && !filter() ) {
            callback();
        } else {
            url = url[ 'url' ];
        }
    }

    const extname = url.split('.').pop();

    switch ( extname ) {
        case 'css': {
            util.loadStyle( { url, callback } );
            break;
        }
        case 'js': {
            util.loadScript( { url, callback } );
            break;
        }
    }
};

module.exports = util;
