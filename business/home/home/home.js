define(["amaze","framework/services/homeService","framework/services/productService"],function (amaze,homeService,productService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var ss= new homeService($q);
	var ps = new productService($q);
	$scope.getProductList=function(){
		ps.getProductList().then(function(data){
			console.log(data)
			if(data.code===0){
				var products=data.data.products;
				function getSimpleList(pro,value){
					var d=products.filter(function (i){
							return i[pro]===value;
						})
					var a=[]
					for(var i=0;i<d.length;i++){
						a.push({id:d[i].id,name:d[i].name})
					}
					return a;
				}
				$scope.productList_danpin=getSimpleList("category_id",1);
				$scope.productList_guoqie=getSimpleList("category_id",2);
				$scope.productList_tuangou=getSimpleList("property",3);
				$scope.title="首页管理";
				ss.getSettings().then(function(data){
					if(data.code===0){
						var backResposeData=data.data;
						$scope.productList_danpin_ids=getIdList(1);
						$scope.productList_guoqie_ids=getIdList(2);
						$scope.productList_tuangou_ids=getIdList(3);
						
						function getIdList(val){
							var positions=backResposeData.filter(function (i){
									return i["position"]===val;
								})
							if(!positions[0]){
								return [];
							}
							var d=positions[0].products;
							var a=[]
							for(var i=0;i<d.length;i++){
								a.push(d[i].id)
							}
							return a;
						}
						
					}else{
						alert(JSON.stringify(data))
					}
				},function(err){
						alert(JSON.stringify(err))
				});	
			
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
	});	
	}
	$scope.getProductList();

	$scope.saveproduct = function(){
		$scope.tipMessageOnLeft="保存首页";
		var setting={
			"setting_type": 1,
			"data": [
				{
					"category": 1,
					"products": !$scope.productList_danpin_ids?[]:$scope.productList_danpin_ids
				},
				{
					"category": 2,
					"products": !$scope.productList_guoqie_ids?[]:$scope.productList_guoqie_ids
				},
				{
					"category": 3,
					"products": !$scope.productList_tuangou_ids?[]:$scope.productList_tuangou_ids
				}
			]
		}
		ss.updateSettings(setting,$scope.users.setheaders).then(function(data){
			console.log(data)
			if(data.code===0){
				console.log("update");
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
		});
	}

	}];
	return ctrl;
});
