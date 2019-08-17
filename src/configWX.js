
export default ()=>{
	window.wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: 'wx23f62436956b867e', // 必填，公众号的唯一标识
		timestamp: '1565944870', // 必填，生成签名的时间戳
		nonceStr: '123123123123123', // 必填，生成签名的随机串
		signature: '6df4974f70858353dbfe6e8aa2437bf86baa9a53',// 必填，签名
		jsApiList: ['previewImage'] // 必填，需要使用的JS接口列表
	});
	
	window.wx.ready(function(){
	   console.log('配置成功')
	});
}
