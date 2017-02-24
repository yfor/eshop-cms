define(["amaze","framework/services/advertService"],function (amaze,advertService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var as = new advertService($q);
		$scope.getAdvertList=function(){
			as.getAdvertList().then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.tipMessageOnLeft="广告查询";
					$scope.advertList=data.data.adverts;
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
					alert(JSON.stringify(err))
		});	
		}
		$scope.getAdvertList();

		
	$scope.delAdvert= function(id){
		as.delAdvert(id,$scope.users.setheaders).then(function(data){
			console.log(data)
			if(data.code===0){
				$scope.tipMessageOnLeft="删除广告";
				$scope.getAdvertList();
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

