define(["amaze",
	"framework/services/orderService","datetimepicker"],function (amaze,orderService,datetimepicker){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var $dpInput = $('.form-datetime').datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
		$('#timeStart').datetimepicker('update', new Date());
		$('#timeEnd').datetimepicker('update', new Date());
		
		
		var orderStatuTypeMap={}
		for (var i in $scope.orderStatuType){
			orderStatuTypeMap[$scope.orderStatuType[i]]=i;
		}
		$scope.orderStatuTypeMap=orderStatuTypeMap;
		$scope.queryObject={
			status:"2"
		};
		//queryObject
		var os = new orderService($q);
		$scope.getOrders=function(){
			console.log($scope.queryObject)
			os.getOrderStatus($scope.users.account_id).then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.orderList=data.data;
				}else{
					alert(JSON.stringify(data))
				}

			},function(err){
				alert(JSON.stringify(err))
			});
		}		
		$scope.getOrders()
		$scope.closeOrder= function(id,order,$event){
		$event.stopPropagation()
		order.status=3;
		os.closeOrder(id,order,$scope.users.setheaders).then(function(data){
			
			console.log(data)
			if(data.code===0){
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

