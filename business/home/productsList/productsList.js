define(["amaze","framework/services/productService"],function (amaze,productService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var ps = new productService($q);
		$scope.getProductList=function(){
			
			ps.getProductList($scope.query).then(function(data){
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
	$scope.productCategoriesType=[
	{
		name:"单品精选",
		id:1
	},
		{
		name:"果切",
		id:2
	},	{
		name:"企业套餐",
		id:3
	},	{
		name:"周边",
		id:4
	}
	]
	$scope.productPropertiesType=[
	{
		name:"普通商品",
		id:1
	},
		{
		name:"广告商品",
		id:2
	},
	{
		name:"团购商品",
		id:3
	},
		{
		name:"秒杀商品",
		id:4
	}]	
	}
	];
	return ctrl;
});

