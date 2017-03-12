define(["angular","framework/http"],function(angular,https){
	function accountsReq($q){
		https.call(this,$q);
	}
	accountsReq.prototype = new https();

	accountsReq.prototype.getUserDetails = function(id){
		return this.doRequest({
				url:"/api/v1/accounts/" + id ,
				method:"get"
			});
	}
	return accountsReq;
});