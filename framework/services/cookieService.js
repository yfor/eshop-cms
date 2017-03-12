define([],function(){

	function setCookie(key,value,day) {
		var date=new Date();
		date.setDate(date.getDate()+day);
		document.cookie=key+'='+escape(value)+';expires='+date;
	}

	function getCookie(key) {
		var coo=unescape(document.cookie);
		var arr1=coo.split('; ');
		for (var i=0;i<arr1.length;i++){
				var arr2=arr1[i].split('=');
				if(arr2[0]==key){
						 return arr2[1];
				}
		}
	}
	function removeCookie(key) {
		 setCookie(key,'',-1);
	}
	var cs={
		setCookie:setCookie,
		getCookie:getCookie,
		removeCookie:removeCookie
	}
	return cs;
});