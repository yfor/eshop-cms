define(["amaze",
	"framework/services/orderService"],function (amaze,orderService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		
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
		$scope.closeOrder= function(id,order){
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

