define(["angular","ui-router"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
		$urlRouterProvider.when("", "/login");
		$urlRouterProvider.otherwise("/login");
		$stateProvider.state("login",{
			url:"/login",
			templateUrl:"./business/home/login/login.html",
			controller:"login.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/home/login/login"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("login.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});
		$stateProvider.state("orderList",{
					url:"/orderList",
					templateUrl:"./business/home/orderList/orderList.html",
					controller:"orderList.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/orderList/orderList"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("orderList.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});
		$stateProvider.state("order",{
					url:"/order?:orderId",
					templateUrl:"./business/home/order/order.html",
					controller:"order.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/order/order"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("order.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});				
		$stateProvider.state("productsList",{
					url:"/productsList",
					templateUrl:"./business/home/productsList/productsList.html",
					controller:"productsList.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/productsList/productsList"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("productsList.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});
		$stateProvider.state("product",{
					url:"/product?:productId",
					templateUrl:"./business/home/product/product.html",
					controller:"product.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/product/product"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("product.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});
		$stateProvider.state("adverts",{
					url:"/adverts",
					templateUrl:"./business/home/adverts/adverts.html",
					controller:"adverts.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/adverts/adverts"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("adverts.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});
		$stateProvider.state("advert",{
					url:"/advert?:advertId",
					templateUrl:"./business/home/advert/advert.html",
					controller:"advert.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/advert/advert"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("advert.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});	
		$stateProvider.state("groups",{
					url:"/groups",
					templateUrl:"./business/home/groups/groups.html",
					controller:"groups.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/groups/groups"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("groups.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});
		$stateProvider.state("group",{
					url:"/group?:groupId",
					templateUrl:"./business/home/group/group.html",
					controller:"group.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/group/group"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("group.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});		
		$stateProvider.state("timeLimits",{
					url:"/timeLimits",
					templateUrl:"./business/home/timeLimits/timeLimits.html",
					controller:"timeLimits.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/timeLimits/timeLimits"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("timeLimits.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});
		$stateProvider.state("timeLimit",{
					url:"/timeLimit?:timeLimitId",
					templateUrl:"./business/home/timeLimit/timeLimit.html",
					controller:"timeLimit.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/timeLimit/timeLimit"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("timeLimit.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});						
		
	}];
	

    var  mo = angular.module("ui.router");
    mo.config(config);
    return  mo;
});
