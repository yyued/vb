import vb from './view-boot';

const { config, view, boot } = vb;

// vb({
//     loading: '#page-loading',
//     el: '#page-template',
//     path: '/',
//     resources: [
//         './css/t1.css',
//     ],
//     autoInsertTemplate: true,
//     template: require('./template/t1')( ),
// })

config({
    loading: '#page-loading',
    el: '#page-template',
})

view({
    path: '/',
    resources: [
        './css/t1.css',
    ],
    autoInsertTemplate: true,
    template: require('./template/t1')( ),
})

view({
    path: '/t/:id?/:name?',
    alias: '/t1',
    resources: [
        '/css/t1.css',
    ],
    entry: ( ) => import('./t1'),
    autoInsertTemplate: true,
    template: ( ) => import('./template/t1'),
    loaded ( option ) {
        console.log( option.route );
        console.log( option.entry );

        option.entry( );
    },
})

boot();
