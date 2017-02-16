define(["angular","framework/http"],function(angular,https){
	function ordersReq($q){
		https.call(this,$q);
	}
	ordersReq.prototype = new https();
	ordersReq.prototype.getOrderStatus = function(query){
		var str="?";
		for(var i in query){
			str+=i+"="+query[i]+"&"
		}
		return this.doRequest({
			url:"/api/v1/orders"+str,
			method:"get"
		});
	}
	ordersReq.prototype.getOrder = function(id){
		
		return this.doRequest({
			url:"/api/v1/orders/"+ id,
			method:"get"
		});
	}
	ordersReq.prototype.closeOrder = function(id,data,headers){
	
		return this.doRequest({
			url:"/api/v1/orders/"+ id,
			method:"put",
			data:JSON.stringify(data),
			headers:headers
		});
	}
	return ordersReq;
});