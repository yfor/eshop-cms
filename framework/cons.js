define(function(){
	var cons={}
	cons.serviceIP="http://116.62.6.81";
	cons.orderStatuType={
			0:"已取消",
			1:"未支付",
			2:"已支付",
			3:"已发货",
			9:"已完成"
		}

	cons.advertStatus=[
	{
		name:"未投放",
		id:0
	},
		{
		name:"投放中",
		id:1
	},
		{
		name:"已下架",
		id:2
	}]	
	cons.units=[
	{
		name:"斤",
		id:0
	},
		{
		name:"份",
		id:1
	},	{
		name:"个",
		id:2
	},	{
		name:"盒",
		id:3
	},	{
		name:"箱",
		id:4
	}
	]
	return cons;
});