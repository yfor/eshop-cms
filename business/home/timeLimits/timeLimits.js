define(["amaze","framework/services/panic_buyingService"],function (amaze,panic_buyingService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var as = new panic_buyingService($q);
		$scope.getPanic_buyingServiceList=function(){
			as.getPanic_buyingServiceList().then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.tipMessageOnLeft="限时购查询";
					$scope.panic_buyings=data.data.panic_buyings;
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
					alert(JSON.stringify(err))
		});	
		}
		$scope.getPanic_buyingServiceList();

		
	$scope.delpanic_buying= function(id){
		var r=confirm("确定删除限时购!");
		if (r==false)
		{
			return;
		}
		as.delAdvert(id,$scope.users.setheaders).then(function(data){
			console.log(data)
			if(data.code===0){
				$scope.tipMessageOnLeft="删除限时购";
				$scope.getPanic_buyingServiceList();
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

