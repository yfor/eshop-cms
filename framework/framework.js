define(
	['angular',
	"ui-router",
	"amaze",
	"framework/directive",
	"business/home/config",
	"framework/services/accountService",
	"framework/services/orderService",
	"framework/cons",
	"datetimepicker"
	
	],
	function(angularl,uirouter,amaze,frwork,config,accountService,orderService,cons,datetimepicker){
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
	frame.run(function($rootScope,$state,$http,$q,$interval){
		$rootScope.users = {};
		$rootScope.users.account_id=2;
		$rootScope.serviceIP=cons.serviceIP;
		$rootScope.orderStatuType=cons.orderStatuType;
		$rootScope.advertStatus=cons.advertStatus;
		$rootScope.productStatus=cons.productStatus;
		$rootScope.units=cons.units;
		$rootScope.pay_awayType=cons.pay_awayType;
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
			},0);

		});

		$rootScope.scrollToZero = function(){
			$("body").animate({
				scrollTop:0
			},0);
		}
		
		
		$rootScope.historyBack = function(){
			window.history.back(-1);
		};
		var os = new orderService($q);
		$rootScope.number=0;
		$rootScope.lastRefreshTimeInput=$('<input id="lastRefreshTime" size="16" type="text"  readonly class="form-datetime am-form-field">')
		.datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
		
	$rootScope.tippEdOrder={}
	$interval(function(){
		var queryObject={
			status:"2"
		};
		var nowBeforeDay=new Date()
		nowBeforeDay.setDate(nowBeforeDay.getDate()-1)
		$rootScope.lastRefreshTimeInput.datetimepicker('update',nowBeforeDay);
		$rootScope.lastRefreshTimeEndInput=$('<input id="lastRefreshTimeEnd" size="16" type="text"  readonly class="form-datetime am-form-field">')
		.datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
		var nowAfterDay=new Date()
		nowAfterDay.setDate(nowAfterDay.getDate()+1)
		$rootScope.lastRefreshTimeEndInput.datetimepicker('update',nowAfterDay);
		
		
		
		queryObject.begin_time=$rootScope.lastRefreshTimeInput.val();
		queryObject.end_time=$rootScope.lastRefreshTimeEndInput.val();
		os.getOrderStatus(queryObject).then(function(data){
			if(data.code===0){
				var orders=data.data.orders;
				queryObject.status=1;	
				queryObject.pay_away=2;
				os.getOrderStatus(queryObject).then(function(data){
					console.log(data)
					if(data.code===0){
						orders=orders.concat(data.data.orders);
						proTips(orders);
						
						
					}else{
						$rootScope.number=0;
						alert(JSON.stringify(data))
					}

				},function(err){
					$rootScope.number=0;
					alert(JSON.stringify(err))
				});
				
			}else{
				$rootScope.number=0;
				alert(JSON.stringify(data))
			}

		},function(err){
			$rootScope.number=0;
			alert(JSON.stringify(err))
		});

   

	},1000*60*3);//3分钟 *60*3
		
		
	function proTips(orders){
		var isPlayMusic=false;
		var showTips={};
		for(var i in orders){
			var order =orders[i];
			var order_number=order.order_number
			if($rootScope.tippEdOrder.hasOwnProperty(order_number)){
				if($rootScope.tippEdOrder[order_number]<4){
					$rootScope.tippEdOrder[order_number]++;
					isPlayMusic=true;
				}
			}else{
				$rootScope.tippEdOrder[order_number]=0;
				isPlayMusic=true;
			}
			
			var order_details=order.order_details
			for(var j in order_details){
				
				var order_detail_item=order_details[j];
				var id=order_detail_item.product.id;
				var quantity=order_detail_item.amount;
				if(showTips[id]){
					showTips[id].needNumber+=quantity;
				}else{
					showTips[id]={};
					showTips[id].needNumber=quantity;
					showTips[id].name=order_detail_item.product.name;
					showTips[id].stock=order_detail_item.product.stock;
				}
				
				if(order_detail_item.subitems){
					for(var k in order_detail_item.subitems){
						var order_detail_item_s=order_detail_item.subitems[k];
						var id=order_detail_item_s.product.id;
						var quantity=order_detail_item_s.amount;
						if(showTips[id]){
							showTips[id].needNumber+=quantity;
						}else{
							showTips[id]={};
							showTips[id].needNumber=quantity;
							showTips[id].name=order_detail_item_s.product.name;
							showTips[id].stock=order_detail_item_s.product.stock;
						}
					}
				}
			}
			
		}
		var total_count=orders.length;
	
		$rootScope.number=total_count;
		$rootScope.showTips=showTips;
		if(isPlayMusic){
			order_mp3.play()	
		}
	}
		
	});

	return frame;
});
