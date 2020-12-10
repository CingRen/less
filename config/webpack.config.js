const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');//加载html-webpack-plugin插件模块
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//加载清理模块
module.exports = {
    mode:'production',//development
    entry:{
        index:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'../dist'),//打包完成输出文件的路径  绝对路径
        // filename:'index.js'//输出文件名称
        filename:'[name].[hash].js' //[name] 默认是main 如果是多入口就是入口键名
        // filename:'[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),//输出路径,开启网页服务器的根路径
        compress: true,//是否压缩
        port: 8080,//端口号 开启服务器的端口
        open:true//是否自动打开浏览器
      },
    module:{
        //解析规则
        rules:[
            {
                //文件解析匹配规则  正则规则
                test:/\.css$/,
                use:[//表示匹配到的文件 需要用哪些loader来处理
                    // {loader:'style-loader'},
                    {loader:miniCssExtractPlugin.loader},
                    {loader:'css-loader'}
                ]
            },
            {
                test:/\.less$/, //匹配less结尾的文件
                use:[//表示匹配到的文件 需要用哪些loader来处理
                    // {loader:'style-loader'},
                    {loader:miniCssExtractPlugin.loader},
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]
            },
            {
                test:/\.s[ac]ss$/i, //匹配
                use:[//表示匹配到的文件 需要用哪些loader来处理
                    // {loader:'style-loader'},
                    {loader:miniCssExtractPlugin.loader},
                    {loader:'css-loader'},
                    {loader:'sass-loader'}
                ]
            },
            // {
            //     test:/\.(jpg|png|gif|webp|jpeg)$/, //匹配
            //     use:[//表示匹配到的文件 需要用哪些loader来处理
            //         {loader:'file-loader'}
            //     ]
            // },
            {
                test:/\.(jpg|png|gif|webp|jpeg)$/, //匹配
                use:[//表示匹配到的文件 需要用哪些loader来处理
                    {
                        loader:'url-loader',
                        options:{
                            limit:102400 //单位byte 图片小于100k 的时候转化base64
                        }
                    }
                ]
            },
            {
                test: /\.js$/, //匹配js文件
                //转化的时候排除node——modules 和 brower_components文件夹
                exclude: /(node_modules|bower_components)/,
                use:[//表示匹配到的文件 需要用哪些loader来处理
                    {
                        loader: 'babel-loader',//用babel-loader处理
                        options:{//选项参数
                            presets: ['env']//预设es6转化 es5
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({//构造函数传参
            title:"网页标题aa", //网页标题
            template: './src/index.html',//模板路径
            inject: 'body',//（true | body | head | false），true 默认值，script标签位于html文件的 body 底部； 
                        //body：script标签位于html文件的 body底部；
                        //head： script标签位于html文件的 head中；false：不插入生成的js文件
            minify: {//html压缩规则
                removeComments: true,//是否移除注释
                removeAttributeQuotes: false,//是否移除属性的双引号
                collapseWhitespace: false //是否移除空白
            },
            chunks:['index'],
            filename: 'index.html'//输出模板名称
        }),
        new miniCssExtractPlugin({//初始化插件
            filename:'[name].[hash].css'
            // filename:'[name].css'
        }),
        new CleanWebpackPlugin()//创建清理插件对象
    ]

}