define(
	['angular',
	"ui-router",
	"amaze",
	"framework/directive",
	"business/home/config",
	"framework/services/accountService"
	],
	function(angularl,uirouter,amaze,frwork,config,accountService){
	var con = ["$scope","$state","$rootScope",function($scope,$state,$rootScope){

	}];
	
	deps = ["ng",
	"ui.router",
	config.name
	];
	var frame =  angular.module("framework",deps);
	frame.controller("mycontroller",con);
	frame.config(function(){
	});
	// run
	frame.run(function($rootScope,$state,$http,$q){
		$rootScope.users = {};
		$rootScope.users.account_id=2;
		getUserDetails();
		function getUserDetails(){
		var accountIns = new accountService($q);
		accountIns.getUserDetails($rootScope.users.account_id).then(function(data){
				addHeader(data.data.account);
				$rootScope.users.customer = data.data.customer;
				$rootScope.users.owner_id = data.data.customer.id;
				//$state.go("login");
				function addHeader(data){
						var id = data.id;
						var token = data.authentication_token;
						var headers = {
							"Authorization":"Token token=\""+ token + "\"," + "id="+ "\""+ id +"\"",
							"Content-Type":'application/json'
						};
						$rootScope.users.setheaders = headers;
				}
			},function(err){
				console.log(err);
				//$state.go("login");
			});
		}
		



		$rootScope.$on("$stateChangeStart",function(e,c,n){
			$(".loading").show();	
		});
		$rootScope.$on("$stateChangeSuccess",function(e,c,n){
			setTimeout(function(){
				$(".loading").hide();				
			},200);

		});

		$rootScope.scrollToZero = function(){
			$("body").animate({
				scrollTop:0
			},0);
		}
		

		$rootScope.historyBack = function(){
			window.history.back(-1);
		};

	});

	return frame;
});
