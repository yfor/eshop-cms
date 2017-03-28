define(["amaze","framework/services/productService","uploadPreview"],function (amaze,productService,uploadPreview){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	var ps = new productService($q);
	if($stateParams.productId){
		$scope.title="编辑产品";
		ps.getProduct($stateParams.productId).then(function(data){
			console.log(data)
			if(data.code===0){
				$scope.tipMessageOnLeft="查询产品信息";
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
			name:"果切",
			id:2
		},	{
			name:"企业套餐",
			id:3
		},	{
			name:"周边",
			id:4
		},  {
			name:"鲜榨果汁",
			id:5
		}
	]
	$scope.productProperties=[
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

	$scope.isDefalut=[
	{
		name:"是",
		id:true
	},
		{
		name:"否",
		id:false
	}
	]
	$scope.addPrices=function(){
		$scope.product.prices.push(
				{
                "price": 1,
                "real_price": 1,
                "unit": 1,
                "is_default": false	,
                "display_quantity": 2,
                "display_unit": 1
            }
		)

	
	}
	$scope.addCompute_strategies=function(){
		$scope.product.compute_strategies.push(
            {
                "classify": 2,
                "average_quantity": 1,
                "average_unit": 1,
                "remark": "备注"
            }
		)

	
	}
	
	
	$scope.removeCompute_strategies=function(index){
		$scope.product.compute_strategies.splice(index,1)
	}
	$scope.removePrices=function(index){
		$scope.product.prices.splice(index,1)
	}
	
	$scope.product={
		name:"繁花·混合鲜花月套餐",
		description:"一周一花，每月4次，精选3-5种当季花材，品种随机",
		price:159,
		real_price:172,
		stock:1000,
		category_id:1,
		unit:"斤",
		property:1,
		status:0,
		prices:[
				{
                "price": 1,
                "real_price": 1,
                "unit": 1,
                "is_default": true,
				"display_quantity": 2,
                "display_unit": 1
            }
		],
		"compute_strategies": [
            {
                "classify": 2,
                "average_quantity": 1,
                "average_unit": 1,
                "remark": "备注"
            }
        ],
		
		"group_buying": {
            "target_amount": 100.2,
            "begin_time": "2017-03-04 16:51",
            "end_time": "2017-03-08 16:50",
            "limit_min": 2,
            "limit_max": 5
        }
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
		$scope.tipMessageOnLeft="上传产品图片";
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
			    headers["Content-Type"]="application/json";
				$scope[categoryModelStr]=data.data.pictures;
				product[categoryModelStr]=undefined;
			    console.log(data)
		   }).error(function(err){
			   headers["Content-Type"]="application/json";
			   alert(JSON.stringify(err))
		 });
	}
	$scope.saveProduct = function(){
		$scope.tipMessageOnLeft="保存产品";
		var product = $scope.product;
		var productData={}
		var str="name,description,stock,remark,category_id,prices,status,id,compute_strategies,property,group_buying";
		for(var i in product){
			 if(str.indexOf(i)>-1){
			 
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

	$scope.initDate = function(){
		var $dpInput = $('.form-datetime').datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
	}
	$scope.initDate();
	}];
	return ctrl;
});
