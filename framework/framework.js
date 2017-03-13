define(
	['angular',
	"ui-router",
	"amaze",
	"framework/directive",
	"business/home/config",
	"framework/cons",
	"framework/services/initService",
	"framework/services/cookieService"
	],
	function(angularl,uirouter,amaze,frwork,config,cons,init,cookieService){

	
	deps = ["ng",
	"ui.router",
	config.name
	];
	var frame =  angular.module("framework",deps);
	
	frame.config(function(){
	});
	// run
	frame.run(function($rootScope,$location,$interval,$q){

		$rootScope.serviceIP=cons.serviceIP;
		$rootScope.orderStatuType=cons.orderStatuType;
		$rootScope.advertStatus=cons.advertStatus;
		$rootScope.productStatus=cons.productStatus;
		$rootScope.units=cons.units;
		$rootScope.pay_awayType=cons.pay_awayType;
		
		$rootScope.$on("$stateChangeStart",function(e,c,n){
			$(".loading").show();	
			debugger
		});
		$rootScope.$on("$stateChangeSuccess",function(e,c,n){
			setTimeout(function(){
				$(".loading").hide();				
			},10);

		});

		$(".loading").hide();
		var id=cookieService.getCookie("userNecessary");
		if(!id){
			$location.path('/login');
		}else{
			if($location.path()!=="/login"){
				init.run($rootScope,$interval,$q);
			}
		}

	});

	return frame;
});
