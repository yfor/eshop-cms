define(['datetimepicker',"framework/services/accountService","framework/services/orderService","framework/services/cookieService"],function(datetimepicker,accountService,orderService,cookieService){

	var init={};
	init.run=function($rootScope,$interval,$q){
		$rootScope.users = {};
		$rootScope.users.account_id=2;
		getUserDetails();
		function getUserDetails(){
		var accountIns = new accountService($q);
		accountIns.getUserDetails($rootScope.users.account_id).then(function(data){
				addHeader(data.data.account);
				$rootScope.users.customer = data.data.customer;
				$rootScope.users.owner_id = data.data.customer.id;
				cookieService.setCookie("userNecessary",$rootScope.users.account_id,1);
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
				
			});
		}
		var os = new orderService($q);
		$rootScope.number=0;
		$rootScope.tippEdOrder={}
		$interval(getOrders,1000*60*3);//3分钟 
		getOrders();	

		function getOrders(){
			$rootScope.lastRefreshTimeInput=$('<input id="lastRefreshTime" size="16" type="text"  readonly class="form-datetime am-form-field">')
			.datetimepicker({
				language:  'zh-CN',
				format: 'yyyy-mm-dd hh:ii',
				autoclose: true,
				todayBtn: true
			});		
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
			
			var queryObject={
				type:"untreated"
			};
			queryObject.begin_time=$rootScope.lastRefreshTimeInput.val();
			queryObject.end_time=$rootScope.lastRefreshTimeEndInput.val();
			os.getOrderStatus(queryObject).then(function(data){
				if(data.code===0){
					var orders=data.data.orders;
					proTips(orders);

					
				}else{
					$rootScope.number=0;
					alert(JSON.stringify(data))
				}

			},function(err){
				$rootScope.number=0;
				alert(JSON.stringify(err))
			});

	   

		}		
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
		}
	return init;
});