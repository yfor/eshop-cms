define(["angular","framework/http"],function(angular,https){
	function pdtRequest($q){
		https.call(this,$q);
	}
	pdtRequest.prototype = new https();
	pdtRequest.prototype.getSettings = function(){
		return this.doRequest({
			url:"/api/v1/settings?setting_type=1",
			method:"get"
		});
	}

	pdtRequest.prototype.updateSettings = function(setting,headers){
		var id=1;
		return this.doRequest({
			url:"/api/v1/settings/"+"/"+id,
			method:"put",
			data:JSON.stringify({setting:setting}),
			headers:headers
		});
	}
	return pdtRequest;
});