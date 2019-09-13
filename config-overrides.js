const { override, fixBabelImports, addLessLoader } = require('customize-cra');
//使用babel-plugin-import 插件进行按需引入的插件打包
 module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //修改antd中less的变量的值来达到修改主题的目的
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);