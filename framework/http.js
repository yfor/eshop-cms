define(["framework/ajaxServer"],function(ajax){
	function http($q){
		this.$q = $q;
		this.ajax = new ajax($q);
	}

	http.prototype.doRequest = function(options){
		var $q = this.$q;
		var def = $q.defer();
		this.ajax[options.method](options).then(function(data){
			angular.element(document.querySelector("body")).scope().info=true;
			angular.element(document.querySelector("body")).scope().error=false;
			def.resolve(data);
		},function(err){
			angular.element(document.querySelector("body")).scope().info=false;
			angular.element(document.querySelector("body")).scope().error=true;
			def.reject(err);
		});
		return def.promise;
	}
	return http;
});