define(["amaze","framework/services/productService","uploadPreview"],function (amaze,productService,uploadPreview){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var ps = new productService($q);

	$scope.title="编辑团购";
	ps.getProduct($stateParams.groupId).then(function(data){
		console.log(data)
		if(data.code===0){
			$scope.tipMessageOnLeft="查询团购信息";
			var product=data.data;
			if(product.group_buying){
				product.group_buying.begin_time=new Date(product.group_buying.begin_time).Format("yyyy-MM-dd hh:mm:ss");
				product.group_buying.end_time=new Date(product.group_buying.end_time).Format("yyyy-MM-dd hh:mm:ss");
			}
		
			
			
			$scope.product=product;
			for(var i in $scope.imageType){
				$scope[$scope.imageType[i]]=data.data.pictures[i]
			}
		}else{
			alert(JSON.stringify(data))
		}
	},function(err){
			alert(JSON.stringify(err))
	});	




	
	

	




	$scope.saveProduct = function(){
		$scope.tipMessageOnLeft="保存团购";
		var product = $scope.product;
		var productData={}
		var str="name,description,stock,remark,category_id,prices,status,id,compute_strategies,property,group_buying";
		for(var i in product){
			 if(str.indexOf(i)>-1){
			 
				  productData[i]=(product[i]);
			 }	 
		}
	
		//upload
	
		ps.updateProduct(productData,$scope.users.setheaders).then(function(data){
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

		var $dpInput = $('.form-datetime').datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
	}];
	return ctrl;
});
