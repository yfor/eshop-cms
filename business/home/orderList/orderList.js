define(["amaze",
	"framework/services/orderService","datetimepicker"],function (amaze,orderService,datetimepicker){
	var ctrl = ["$scope","$state","$stateParams","$http","$q","$rootScope",function($scope,$state, $stateParams,$http,$q,$rootScope){
		var $dpInput = $('.form-datetime').datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
		$scope.queryObject={
			status:"2"
		};
		var nowBeforeDay=new Date()
		nowBeforeDay.setDate(nowBeforeDay.getDate()-1)
		$('#timeStart').datetimepicker('update',nowBeforeDay);
		
		var nowAfterDay=new Date()
		nowAfterDay.setDate(nowAfterDay.getDate()+1)
		$('#timeEnd').datetimepicker('update', nowAfterDay);
	
		$scope.paginationConf = {
			currentPage: 1,
			totalItems: 200,
			itemsPerPage: 15,
			pagesLength: 5,
			perPageOptions: [15, 20, 30, 40, 50],
			onChange: $scope.getOrders
		};
		var orderStatuTypeMap={}
		for (var i in $scope.orderStatuType){
			orderStatuTypeMap[$scope.orderStatuType[i]]=i;
		}
		$scope.orderStatuTypeMap=orderStatuTypeMap;
	
		
		var os = new orderService($q);
		//queryObject
		$scope.getOrders=function(){

			$scope.tipMessageOnLeft="订单查询";
			var queryObject=$scope.queryObject;
			if($scope.isNeedPro){
				var queryObject={
					type:"untreated"
				};
			}
			queryObject.begin_time=$('#timeStart').val();
			queryObject.end_time=$('#timeEnd').val();
			queryObject.page=$scope.paginationConf.currentPage;
			queryObject.per_page=$scope.paginationConf.itemsPerPage;
			os.getOrderStatus(queryObject).then(function(data){
				if(data.code===0){
					$scope.orderList=data.data.orders;
					$scope.paginationConf.totalItems=data.data.total_count;
				}else{
					$scope.orderList=[];
					$scope.paginationConf.totalItems=0;
					alert(JSON.stringify(data))
				}

			},function(err){
				$scope.orderList=[];
				$scope.paginationConf.totalItems=0;
				alert(JSON.stringify(err))
			});
		}
		$scope.isNeedPro=true;
		$scope.setQueryType=function(){
			$scope.isNeedPro=!$scope.isNeedPro;
		}		
		$scope.getOrders();
		$scope.closeOrder= function(order,$event){
			var id=order.id;
			$scope.tipMessageOnLeft="修改订单";
			$event.stopPropagation()
			var orderData={}
			orderData.status=3;
			os.closeOrder(id,orderData,$scope.users.setheaders).then(function(data){
				console.log(data)
				if(data.code===0){
					order.status=3;
					//$scope.getOrders();
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
				alert(JSON.stringify(err))
			});
		}
	}

	];
	return ctrl;
});

