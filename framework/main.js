require.config({
	baseUrl:"./",

	map:{
		"*":{
			"jquery":"lib/jquery.min",
			"angular":"lib/angular.min",
			"ui-router":"lib/angular-ui-router",
			"amaze":"lib/amaze/js/amazeui.min.js",
			"iscl":"lib/iscroll.js",
			"uploadPreview":"lib/uploadPreview.js",
		},
	},

	paths :{
		amaze:"lib/amaze/js"
		
	},

	shim:{
		'lib/jquery.min':{
			"exports":'$'
		},

		"amaze/amazeui.min":{
			"deps":["lib/jquery.min"],
			"exports":"amaze"
		},
		'lib/angular.min':{
			"deps":["lib/jquery.min"],
			"exports":'angular'
		},
		"lib/angular-ui-router":{
			"deps":["lib/angular.min"]
		}

	},
	priority:["angular"],

})

require(['jquery','angular',"framework/framework"], function ($,angular,app){
	  angular.bootstrap($('html'), [app.name]);
});