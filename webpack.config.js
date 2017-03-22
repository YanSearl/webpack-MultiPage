const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const glob = require('glob');

function CreatePath () {
    this.filesArr = [];
    this.files = glob.sync('lib/components/*/');
    this.nameJsArr = [];
}

CreatePath.prototype.getEntries = function() {
    var _this = this;
    //获取路径

    var entries = {            
        bundle: './index.js'
    };

    _this.files.forEach(function(filepath) {
        let name = filepath.split('/')[2];
        
        _this.filesArr.push(name);
    });
}

CreatePath.prototype.createHTML = function() {
    this.filesArr.forEach((name) => {
        // 每个页面生成一个html
        var plugin = new HtmlWebpackPlugin({
            template: 'template/template.ejs',
            filename: `pages/${name}/${name}.html`,
            inject: false,
            title: name,
            files: {
                css: ['../../css/commen.css', `../../css/${name}.css`],
                js: ['../../js/commen.js', `${name}.js`]
            }
        });
        
        webpackConfig.plugins.push(plugin);  
    })
}


CreatePath.prototype.createJS = function() {
    this.filesArr.forEach((name) => {
        //let jsArr = glob.sync(`./lib/components/${name}/*.js`);
        let jsArr = glob.sync(`./lib/components/${name}/${name}.js`);

        let nameFilesJs = name;
        
        webpackConfig.entry[name] = jsArr;
    })

}


CreatePath.prototype.init = function() {
    this.getEntries();

    this.createJS();

    this.createHTML();
}


var webpackConfig = {
    entry:{ 
        commen: [ './index.js'],
    },
	output: {
        path: __dirname + '/dist',
        filename: `pages/[name]/[name].js`
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets:[ 'es2015', 'react', 'stage-0' ]
				}
			},
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=80000000000&name=images/[name]/[name]'
            }
		]	
	},
    resolve: {
        alias: {
            fw: 'lib/fw.js'
        }
    },
    plugins: [
        new ExtractTextPlugin({
			filename: `css/[name].css`,
            allChunks: true
		}),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commen'],
            filename: 'js/commen.js'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new StyleLintPlugin({
            config: {
                // 你的lint扩展自刚刚安装的stylelint-config-standard
                "extends": "stylelint-config-standard"
            },
            // 正则匹配想要lint监测的文件
            files: './less/*.less'
        }),        
    ]
}

var createPath = new CreatePath();

createPath.init();

module.exports = webpackConfig;
