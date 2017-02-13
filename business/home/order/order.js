define(["amaze","framework/services/orderService","uploadPreview"],function (amaze,orderService,uploadPreview){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var os = new orderService($q);
	if($stateParams.orderId){
		$scope.title="编辑产品";
		os.getOrder($stateParams.orderId).then(function(data){
			console.log(data)
			if(data.code===0){
				$scope.order=data.data;
				
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
		});	
	}else{
		alert("orderId is needed!")
	}

	}];
	return ctrl;
});
