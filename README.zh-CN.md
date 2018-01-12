<h1 align="center"> view-boot </h1>

## 为什么使用

页面的加载也是一个漫长的过程，解析 HTML 文档，加载 CSS 样式，渲染 DOM 结构，运行 JS 脚本，如果处理不好这样一系列的过程，会造成严重的白屏时间。这个白屏时间越长，可能会导致用户量指数级的流失，因而解决白屏时间显得尤其重要。

解决白屏的时间，有各种各种的方法，大多都是接近原理性的优化，例如：JS 脚本放置到 HTML 尾部、CSS 内联 等等。但无可否认的是，一旦涉及到具体页面的结构逻辑，放置在 HTML 上就或多或少地影响到整个页面加载的进程。

你可以设想一下，如果页面上仅有 Loading DOM 结构 以及 CSS 样式结果就无他了，那这个页面的加载速度会是怎样一回事。必然会是毫秒级别的，对了，这个就是我们的想法。

页面上秒出 Loading 进行让用户的感知到有所反馈，继而通过动态加载 具体页面的逻辑结构、CSS 样式、JS 脚本等等。在这个想法里面，需要实现的是如何动态插入 DOM 结构，以及其他的一些资源。

对于现有业界上的框架，例如：React、Vue、Angular 等都是以框架为核心，进而配上相关的路由库，去实现针对路由对 DOM 结构的编译 以及 插入。但大多忽略一点的是，加载解析本身这个核心的框架所带来的时间差就足够加载这个 Loading 页面好几次了。

换一个角度思维，如果从路由开始去加载资源，进而使用这些框架渲染页面，这不但从本质把最简单化 Loading 页有可能带来的消耗，更加从单一核心库摆脱出来。

这个就是 **view-boot** 正在做的事情。

## 安装

```sh
npm i view-boot --save
```

或者

```html
<script src="https://cdn.jsdelivr.net/npm/view-boot/dist/view-boot.min.js"></script>
```

## 简单使用

```js
import ViewBoot from 'view-boot';

ViewBoot( {
    // loading 节点
    loading: '#loading',
    // 需要插入的 DOM 节点
    el: '#app',
    // HTML 模板
    template: '<div> view-boot </div>',
    // 是否自动插入 HTML 模板
    autoInsertTemplate: true,
} )
```

## 更多

```js
import ViewBoot from 'view-boot';

const { config, view, boot } = ViewBoot;

// 全局配置
config( {
    loading: '#loading',
    el: '#app',
} )

// 设置路由视图
view( {
    // 路由路径
    path: '/',
    // 异步加载资源
    resources: [ '/test.css' ],
    autoInsertTemplate: true,
    template: require('./template/x.tpl')( ),
} )

view( {
    // 路由路径
    path: '/test/:id/:name?',
    // 设置别名
    alias: '/t1',
    resources: [ '/test.css', '/test.js' ],
    // 异步加载入口文件
    entry: ( ) => import('./t1'),
    autoInsertTemplate: true,
    // 异步加载 HTML 模板
    template: ( ) => import('./template/t1'),
    // 加载完成回调
    loaded ( options ) {
        console.log( options.route );
        // 执行页面具体逻辑
        options.entry( );
    },
} )

// 启动
boot( );
```
