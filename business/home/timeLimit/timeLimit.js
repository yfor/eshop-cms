define(["amaze","framework/services/panic_buyingService","framework/services/productService"],function (amaze,panic_buyingService,productService){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var as= new panic_buyingService($q);
	var ps = new productService($q);
	$scope.getProductList=function(){
		ps.getProductList({property:4}).then(function(data){
			console.log(data)
			if(data.code===0){
				var d=data.data.products;
				
				var a=[]
				
				for(var i=0;i<d.length;i++){
					a.push({id:d[i].id,name:d[i].name})
				}
				console.log(a)
				$scope.productList=a;
				if($stateParams.timeLimitId){
					$scope.title="编辑限时购";
					as.getAdvert($stateParams.timeLimitId).then(function(data){
						console.log(data)
						if(data.code===0){
							$scope.panic_buying=data.data;
						
							$scope.tipMessageOnLeft="查询限时购";
							var a=[]
							if($scope.panic_buying.products){
								for(var i=0;i<$scope.panic_buying.products.length;i++){
									a.push($scope.panic_buying.products[i].id)
								}

							}
							console.log(a)
							$scope.panic_buying.product_ids=a;
							$scope.panic_buying.begin_time=new Date($scope.panic_buying.begin_time).Format("yyyy-MM-dd hh:mm:ss");
							$scope.panic_buying.end_time=new Date($scope.panic_buying.end_time).Format("yyyy-MM-dd hh:mm:ss");

						}else{
							alert(JSON.stringify(data))
						}
					},function(err){
							alert(JSON.stringify(err))
					});	
				}else{
					$scope.title="新建限时购";
				}
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
	});	
	}
	$scope.getProductList();
	$scope.panic_buying={
	};
	$scope.savepanic_buying = function(){
		$scope.tipMessageOnLeft="保存限时购";
		var panic_buying = $scope.panic_buying;
		var panic_buyingData={}

		panic_buyingData.id=panic_buying.id;
		panic_buyingData.begin_time=panic_buying.begin_time;
		panic_buyingData.end_time=panic_buying.end_time;

		var a=[]
		for(var i in panic_buying.product_ids){
			
			a[i]=panic_buying.product_ids[i]-0;
		}
		
		
		panic_buyingData.product_ids=a;
		//upload
		if($scope.panic_buying.id){
			as.updateAdvert(panic_buyingData,$scope.users.setheaders).then(function(data){
				console.log(data)
				if(data.code===0){
					console.log("update");
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
					alert(JSON.stringify(err))
			});	
		}else{
			as.createAdvert(panic_buyingData,$scope.users.setheaders).then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.panic_buying.id=data.data.id;
					$scope.title="编辑限时购";
					console.log($scope.panic_buying.id)
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
					alert(JSON.stringify(err))
			});	
		}
	}
	var $dpInput = $('.form-datetime').datetimepicker({
		language:  'zh-CN',
		format: 'yyyy-mm-dd hh:ii',
		autoclose: true,
		todayBtn: true
	});

	}];
	return ctrl;
});
