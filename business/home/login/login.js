define([],function (){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	$scope.currentuser={};
	$scope.currentuser.name="admin"
	$scope.currentuser.pw="123456"
	$scope.login = function(){
		if($scope.currentuser.name==="admin"&&
			$scope.currentuser.pw==="1234561"){
				$state.go("orderList");
			}
		else{
			alert("用户名或密码错误");
		}

	}
	}];
	return ctrl;
});