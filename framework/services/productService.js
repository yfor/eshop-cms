define(["angular","framework/http"],function(angular,https){
	function pdtRequest($q){
		https.call(this,$q);
	}
	pdtRequest.prototype = new https();
	pdtRequest.prototype.getDataforHome = function(num){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/product/"+id,
			method:"get"
		});
	}
	pdtRequest.prototype.createProduct = function(product,headers){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products",
			method:"post",
			data:JSON.stringify(product),
			headers:headers
		});
	}
	pdtRequest.prototype.addTobagList = function(params,datalist){
		console.log(datalist)
		datalist = JSON.stringify(datalist)

		return this.doRequest({
			url:"/api/v1/carts",
			method:"post",
			data:datalist,
			headers:params.headers
		});
	}
	return pdtRequest;
});