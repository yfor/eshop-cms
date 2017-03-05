define(["angular","framework/http"],function(angular,https){
	function advertRequest($q){
		https.call(this,$q);
	}
	advertRequest.prototype = new https();
	advertRequest.prototype.getPanic_buyingServiceList = function(){
		return this.doRequest({
			url:"/api/v1/panic_buyings",
			method:"get"
		});
	}
	advertRequest.prototype.getAdvert = function(id){
		return this.doRequest({
			url:"/api/v1/panic_buyings/"+id,
			method:"get"
		});
	}
	advertRequest.prototype.delAdvert = function(id,headers){
		return this.doRequest({
			url:"/api/v1/panic_buyings"+"/"+id,
			method:"delete",
			headers:headers
		});
	}
	advertRequest.prototype.createAdvert = function(advert,headers){
		return this.doRequest({
			url:"/api/v1/panic_buyings",
			method:"post",
			data:JSON.stringify({panic_buying:advert}),
			headers:headers
		});
	}
	advertRequest.prototype.updateAdvert = function(advert,headers){
		var id =advert.id;
		var advertData={};
		//处理id
		for(var i in advert){
			if(i==="id"){
			}else{
			  advertData[i]=(advert[i]);
			}	 
		}
		return this.doRequest({
			url:"/api/v1/panic_buyings"+"/"+id,
			method:"put",
			data:JSON.stringify({panic_buying:advertData}),
			headers:headers
		});
	}
	return advertRequest;
});