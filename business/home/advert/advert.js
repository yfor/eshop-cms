define(["amaze","framework/services/advertService","framework/services/productService","uploadPreview"],function (amaze,advertService,productService,uploadPreview){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var as= new advertService($q);
	var ps = new productService($q);
	$scope.getProductList=function(){
		ps.getProductList().then(function(data){
			console.log(data)
			if(data.code===0){
				var d=data.data;
				
				var a=[]
				
				for(var i=0;i<d.length;i++){
					a.push({id:d[i].id,name:d[i].name})
				}
				console.log(a)
				$scope.productList=a;
				if($stateParams.advertId){
					$scope.title="编辑广告";
					as.getAdvert($stateParams.advertId).then(function(data){
						console.log(data)
						if(data.code===0){
							$scope.advert=data.data;
						
							$scope.tipMessageOnLeft="查询广告";
							var a=[]
							if($scope.advert.products){
								for(var i=0;i<$scope.advert.products.length;i++){
									a.push($scope.advert.products[i].id)
								}

							}
							console.log(a)
							$scope.advert.product_ids=a;
						

						}else{
							alert(JSON.stringify(data))
						}
					},function(err){
							alert(JSON.stringify(err))
					});	
				}else{
					$scope.title="新建广告";
				}
			}else{
				alert(JSON.stringify(data))
			}
		},function(err){
				alert(JSON.stringify(err))
	});	
	}
	$scope.getProductList();
	
	
	$scope.imageType={
		1:'productSwiperPicture',
		2:'productPicture',
		3:'productDetailsPicture'
	}
	$scope.advertCategories=[
	{
		name:"首页",
		id:1
	}
	]

	$scope.advert={
		title:"38妇女节",
		description:"38妇女节广告节",
		category:1
		
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
		$scope.tipMessageOnLeft="广告图片上传";
		var f = new FormData();
		var files=$scope[categoryModelStr];
		if(!files){
			alert("请选择"+categoryModelStr)
			return;
		}
		if(!$scope.advert.id){
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
		f.append("owner_type", "Advert");
		f.append("owner_id", $scope.advert.id);
	
		var headers=$scope.users.setheaders
		headers["Content-Type"]=undefined;
		
		$http.post($scope.serviceIP+"/api/v1/images", f, {
			  transformRequest: angular.identity,
			  headers: headers
		   }).success(function(data){
				console.log(data)
				$scope[categoryModelStr]=undefined;
				$scope.advert[categoryModelStr+"s"]=data.data.pictures;
		   }).error(function(err){
			   alert(JSON.stringify(err))
		 });
	}
	$scope.saveAdvert = function(){
		$scope.tipMessageOnLeft="保存广告";
		var advert = $scope.advert;
		var advertData={}
		/**
		{"advert"=>{
			"title"=>"三八节首页轮播广告222333",
		"description"=>"广告描述222233333",
		 "status"=>2, 
		"category"=>2,
		 "remark"=>"2222",
		 "product_ids"=>[2150, 2151]}, "id"=>"14"}
		**/
		advertData.id=advert.id;
		advertData.title=advert.title;
		advertData.description=advert.description;
		advertData.status=advert.status;
		advertData.category=advert.category;
		advertData.remark=advert.remark;
		var a=[]
		for(var i in advert.product_ids){
			
			a[i]=advert.product_ids[i]-0;
		}
		
		
		advertData.product_ids=a;
		//upload
		if($scope.advert.id){
			as.updateAdvert(advertData,$scope.users.setheaders).then(function(data){
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
			as.createAdvert(advertData,$scope.users.setheaders).then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.advert.id=data.data.id;
					$scope.title="编辑广告";
					console.log($scope.advert.id)
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
