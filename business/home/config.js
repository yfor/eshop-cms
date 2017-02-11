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
		
	}];
	

    var  mo = angular.module("ui.router");
    mo.config(config);
    return  mo;
});
