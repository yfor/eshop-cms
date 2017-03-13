define(["amaze","framework/services/productService"],function (amaze,productService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var ps = new productService($q);
		$scope.getProductList=function(){
			
			ps.getProductList().then(function(data){
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
	$scope.productCategories=
	{
		1:"单品精选",
		2:"果切",
		3:"企业套餐",
		4:"周边"
	}

	$scope.productProperties=
	{
		1:"普通商品",
		2:"广告商品",
		3:"团购商品",
		4:"秒杀商品"
	}	
	}
	];
	return ctrl;
});

