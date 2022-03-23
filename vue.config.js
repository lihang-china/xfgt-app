module.exports = {
	// chainWebpack: (config) => {
	// 	// 发行或运行时启用了压缩时会生效
	// 	config.optimization.minimizer('terser').tap((args) => {
	// 		const compress = args[0].terserOptions.compress
	// 		// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
	// 		compress.drop_console = true
	// 		compress.pure_funcs = [
	// 			'__f__', // App 平台 vue 移除日志代码
	// 			// 'console.debug' // 可移除指定的 console 方法
	// 		]
	// 		return args
	// 	})
	// },
	transpileDependencies: ['uview-ui', '@dcloudio/uni-ui'],
	lintOnSave: true,
	publicPath: './',
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-plugin-px2rem')({
						rootValue: 12, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
						unitPrecision: 5, //允许REM单位增长到的十进制数字。
						//propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
						// propBlackList: [], //黑名单
						exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
						// selectorBlackList: [], //要忽略并保留为px的选择器
						// ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
						// replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
						mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
						minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
					}),
				]
			}
		}
	},

}
