define(["amaze"],function (amaze){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	$scope.currentuser={};
	$scope.currentuser.name="admin"
	$scope.currentuser.pw="123456"
	$scope.login = function(){
		if($scope.currentuser.name==="admin"&&
			$scope.currentuser.pw==="123456"){
				$state.go("orderList");
			}
		else{
		}

	}
	
	function setCookie(key,value,day) {
		var date=new Date();
		date.setDate(date.getDate()+day);
		document.cookie=key+'='+escape(value)+';expires='+date;
	}
	function removeCookie(key) {
		setCookie(key,'',-1);
	}
	}];
	return ctrl;
});