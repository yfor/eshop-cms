define(["amaze","framework/services/productService","uploadPreview"],function (amaze,productService,uploadPreview){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var ps = new productService($q);
	if($stateParams.productId){
		$scope.title="编辑产品";
		ps.getProduct($stateParams.productId).then(function(data){
			console.log(data)
			if(data.code===0){
				$scope.product=data.data;
				for(var i in $scope.imageType){
					$scope[$scope.imageType[i]]=data.data.pictures[i]
				}
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
		});	
	}else{
		$scope.title="新建产品";
	}
	$scope.imageType={
		1:'productSwiperPicture',
		2:'productPicture',
		3:'productDetailsPicture'
	}
	$scope.productCategories=[
	{
		name:"单品精选",
		id:1
	},
		{
		name:"个人套餐",
		id:2
	},	{
		name:"企业套餐",
		id:3
	},	{
		name:"周边",
		id:4
	}
	]
	$scope.units=[
	{
		name:"斤",
		id:0
	},
		{
		name:"份",
		id:1
	},	{
		name:"个",
		id:2
	},	{
		name:"盒",
		id:3
	},	{
		name:"箱",
		id:4
	}
	]
	$scope.product={
		name:"繁花·混合鲜花月套餐",
		description:"一周一花，每月4次，精选3-5种当季花材，品种随机",
		price:159,
		real_price:172,
		stock:1000,
		category_id:1,
		unit:"斤"
		
	};


	//文件预览
	for(var i in $scope.imageType){
	  $.uploadPreview({
		input_field: "#doc-form-"+$scope.imageType[i],   // Default: .image-upload
		preview_box: "#file-doc-form-"+$scope.imageType[i],  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false,                // Default: false
		success_callback: angular.noop          // Default: null
	  });	
	}

	 
	$scope.uploadPicture= function(category,categoryModelStr){
		//多图
		var product = $scope.product;
		var f = new FormData();
		var files=product[categoryModelStr];
		if(!files){
			alert("请选择"+categoryModelStr)
			return;
		}
		if(!$scope.product.id){
			alert("请先保存")
			return;
		}		
		
		for(var i =0;i< files.length;i++){
				f.append("document_data[]", files[i]);
		}
		//"name"=>"test.png", "remark"=>"remark", "category"=>"1"
		f.append("name", "test.png");
		f.append("remark", "remark");
		f.append("category", category);
	
		// "owner_type"=>"Product", "owner_id"=>"2022"
		f.append("owner_type", "Product");
		f.append("owner_id", $scope.product.id);
	
		var headers=$scope.users.setheaders
		headers["Content-Type"]=undefined;
		
		$http.post($scope.serviceIP+"/api/v1/images", f, {
			  transformRequest: angular.identity,
			  headers: headers
		   }).success(function(data){
				$scope[categoryModelStr]=data.data.pictures;
				product[categoryModelStr]=undefined;
			    console.log(data)
		   }).error(function(err){
			   alert(JSON.stringify(err))
		 });
	}
	$scope.saveProduct = function(){
		var product = $scope.product;
		var productData={}
	
		for(var i in product){
			 if(product[i]&&(product[i].toString()==="[object FileList]")){
			 }else{
				  productData[i]=(product[i]);
			 }	 
		}
		//upload
		if($scope.product.id){
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
		}else{
			ps.createProduct(productData,$scope.users.setheaders).then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.product.id=data.data.id;
					$scope.title="编辑产品";
					console.log($scope.product.id)
				}else{
					alert(JSON.stringify(data))
				}
			},function(err){
					alert(JSON.stringify(err))
			});	
		}
	}


	}];
	return ctrl;
});
