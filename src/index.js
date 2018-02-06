'use strict';

import defaultOption from './core/lib/default_option';
import boot from './core/boot';

const pathWrap = require('path-to-regexp-wrap')( );

let route = { };

let configOption = { };

const ViewBoot = ( option ) => {
    route[ 'default' ] = option;

    ViewBoot.boot( );
}

ViewBoot.config = function ( option ) {
    configOption = option;
}

ViewBoot.view = function ( option ) {
    const { path, alias } = option;

    const opt = Object.assign( JSON.parse( JSON.stringify( defaultOption ) ), configOption, option );

    path ? route[ path ] = opt : route[ 'default' ] = opt;

    if ( typeof alias === 'string' ) {
        alias ? route[ alias ] = opt : route[ 'default' ] = opt;
    }
    else if ( alias instanceof Array ) {
        alias.forEach( a => {
            a ? route[ a ] = opt : route[ 'default' ] = opt;
        });
    }
}

ViewBoot.boot = ( ) => {
    const pathname = location.pathname;

    let routeName = void 0;
    let routeParams = void 0;

    for ( let item in route ) {
        const match = pathWrap( item );
        const params = match( pathname );

        if ( params ) {
            routeParams = params;
            routeName = item;
        }
    }

    const option = route[ routeName ] || route[ 'default' ] || { };

    if ( option ) {
        option.route = { };
        option.route.path = routeName;
        option.route.params = routeParams;
    }

    // render element or string
    option.loading && typeof option.loading === 'string' ? option.loading = document.querySelector( option.loading ) : void 0;
    option.el && typeof option.el === 'string' ? option.el = document.querySelector( option.el ) : void 0;

    boot( option );
}

module.exports = ViewBoot;
