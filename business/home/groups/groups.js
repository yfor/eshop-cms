define(["amaze","framework/services/productService"],function (amaze,productService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var ps = new productService($q);
		$scope.getProductList=function(){
			
			ps.getProductList({property:3}).then(function(data){
				$scope.tipMessageOnLeft="查询产品列表";
				if(data.code===0){
					$scope.productList=data.data.products;
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
					alert(JSON.stringify(err))
		});	
		}
		$scope.getProductList();


	$scope.delProduct= function(id){
		var r=confirm("确定删除产品!");
		if (r==false)
			{
			return;
			}

		ps.delProduct(id,$scope.users.setheaders).then(function(data){
			$scope.tipMessageOnLeft="删除产品";
			if(data.code===0){
				$scope.getProductList();
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

