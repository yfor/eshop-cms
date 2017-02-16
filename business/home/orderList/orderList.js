define(["amaze",
	"framework/services/orderService","datetimepicker"],function (amaze,orderService,datetimepicker){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var $dpInput = $('.form-datetime').datetimepicker({
			language:  'zh-CN',
			format: 'yyyy-mm-dd hh:ii',
			autoclose: true,
			todayBtn: true
		});
		$scope.queryObject={
			status:"2"
		};
		var nowBeforeDay=new Date()
		nowBeforeDay.setDate(nowBeforeDay.getDate()-1)
		$('#timeStart').datetimepicker('update',nowBeforeDay);
		
		var nowAfterDay=new Date()
		nowAfterDay.setDate(nowAfterDay.getDate()+1)
		$('#timeEnd').datetimepicker('update', nowAfterDay);
	
		$scope.paginationConf = {
			currentPage: 1,
			totalItems: 200,
			itemsPerPage: 15,
			pagesLength: 5,
			perPageOptions: [15, 20, 30, 40, 50],
			onChange: $scope.getOrders
		};
		var orderStatuTypeMap={}
		for (var i in $scope.orderStatuType){
			orderStatuTypeMap[$scope.orderStatuType[i]]=i;
		}
		$scope.orderStatuTypeMap=orderStatuTypeMap;
	
		
		var os = new orderService($q);
		//queryObject
		$scope.getOrders=function(){
			$scope.queryObject.begin_time=$('#timeStart').val();
			$scope.queryObject.end_time=$('#timeEnd').val();
			$scope.queryObject.page=$scope.paginationConf.currentPage;
			$scope.queryObject.per_page=$scope.paginationConf.itemsPerPage;
			console.log($scope.queryObject)
			os.getOrderStatus($scope.queryObject).then(function(data){
				console.log(data)
				if(data.code===0){
					$scope.orderList=data.data.orders;
					$scope.paginationConf.totalItems=data.data.total_count;
				}else{
					$scope.orderList=[];
					$scope.paginationConf.totalItems=0;
					alert(JSON.stringify(data))
				}

			},function(err){
				$scope.orderList=[];
				$scope.paginationConf.totalItems=0;
				alert(JSON.stringify(err))
			});
		}		
		$scope.getOrders()
		$scope.closeOrder= function(id,order,$event){
		$event.stopPropagation()
		order.status=3;
		os.closeOrder(id,order,$scope.users.setheaders).then(function(data){
			
			console.log(data)
			if(data.code===0){
				//$scope.getOrders();
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

