define(["angular","framework/http"],function(angular,https){
	function pdtRequest($q){
		https.call(this,$q);
	}
	pdtRequest.prototype = new https();
	pdtRequest.prototype.getProductList = function(){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products",
			method:"get"
		});
	}
	pdtRequest.prototype.getProduct = function(id){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products"+"/"+id,
			method:"get"
		});
	}
	pdtRequest.prototype.delProduct = function(id,headers){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products"+"/"+id,
			method:"delete",
			headers:headers
		});
	}
	pdtRequest.prototype.createProduct = function(product,headers){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products",
			method:"post",
			data:JSON.stringify({product:product}),
			headers:headers
		});
	}
	pdtRequest.prototype.updateProduct = function(product,headers){
		var id =product.id;
		var productData={};
		//处理id
		for(var i in product){
			if(i==="id"){
			}else{
			  productData[i]=(product[i]);
			}	 
		}
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products"+"/"+id,
			method:"put",
			data:JSON.stringify({product:productData}),
			headers:headers
		});
	}
	return pdtRequest;
});