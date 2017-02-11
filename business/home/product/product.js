define(["amaze","framework/services/productService","uploadPreview"],function (amaze,productService,uploadPreview){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	
	if($stateParams.productId){
		$scope.title="编辑产品";
	}else{
		$scope.title="新建产品";
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
	

	var ps = new productService($q);

	//文件名称
	$('.am-form-file input').on('change', function() {
	  var fileNames = '';
	  for (var j in this.files){
		fileNames = '<span class="am-badge">' + this.files[j].name + '</span> ';
		var showId="#file-"+this.id+j;
		$(showId).html(fileNames);
		}  
	});
	//文件预览
	  $.uploadPreview({
		input_field: "#doc-form-productPicture",   // Default: .image-upload
		preview_box: "#file-doc-form-productPicture",  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false,                // Default: false
		success_callback: angular.noop          // Default: null
	  });
	  $.uploadPreview({
		input_field: "#doc-form-productSwiperPicture",   // Default: .image-upload
		preview_box: "#file-doc-form-productSwiperPicture",  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false,                // Default: false
		success_callback: angular.noop          // Default: null
	  });
	  $.uploadPreview({
		input_field: "#doc-form-productDetailsPicture",   // Default: .image-upload
		preview_box: "#file-doc-form-productDetailsPicture",  // Default: .image-preview
		label_field: "#image-label",    // Default: .image-label
		label_default: "Choose File",   // Default: Choose File
		label_selected: "Change File",  // Default: Change File
		no_label: false,                // Default: false
		success_callback: angular.noop          // Default: null
	  });
	$scope.createProduct = function(){
		
		
		
		var productPicture = $scope.product.productPicture;
		var product = $scope.product;
		var productData={}
		/**
		for(var i in product){
			 if(product[i].toString()==="[object FileList]"){
				for (var j in product[i]){
					 fd.append(i+j, product[i][j]);
				}
			 }else{
				  productData[i]=(product[i]);
			 }
			
			 
		}
		**/

		//提交文本
		/**

		ps.createProduct(productData,$scope.users.setheaders).then(function(data){
			console.log(data)
			if(data.code===0){
				$scope.product.id=data.data.id;
				console.log($scope.product.id)
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
		});
		
		**/
		//多图
		var f = new FormData();
		for(var i =0;i< product.productSwiperPicture.length;i++){
				f.append("document_data[]", product.productSwiperPicture[i]);
		}
		//"name"=>"test.png", "remark"=>"remark", "category"=>"1"
		f.append("name", "test.png");
		f.append("remark", "remark");
		f.append("category", "1");
	
		// "owner_type"=>"Product", "owner_id"=>"2022"
		f.append("owner_type", "Product");
		f.append("owner_id", "2022");
	
		var headers=$scope.users.setheaders
		headers["Content-Type"]=undefined;
		
		$http.post("http://116.62.6.81"+"/api/v1/images", f, {
			  transformRequest: angular.identity,
			  headers: headers
		   })
		
		   .success(function(data){
		
			   console.log(data)
		   })
		
		   .error(function(){
		 });
	}


	}];
	return ctrl;
});
