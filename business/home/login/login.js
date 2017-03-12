define(["framework/services/initService","framework/services/cookieService"],function (init,cookieService){
	var ctrl = ["$scope","$state","$rootScope","$q","$interval",function($scope,$state,$rootScope,$q,$interval){
	cookieService.removeCookie('userNecessary');
	$scope.currentuser={};
	$scope.currentuser.name="admin"
	$scope.currentuser.pw="12345"
	$scope.login = function(){
		if($scope.currentuser.name==="admin"&&
		   $scope.currentuser.pw==="123456"){
				$state.go("orderList");
				init.run($rootScope,$interval,$q);
			}
		else{
			alert("用户名或密码错误");
		}

	}

	}];
	return ctrl;
});