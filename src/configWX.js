
import $model from './api.js'


export default ()=>{
	$model.wxSign({url:window.location.href}).then(res=>{
		window.wx.config({
			//debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appId, // 必填，公众号的唯一标识
			timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.signature,// 必填，签名
			jsApiList: ['previewImage','openLocation','updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
		});
	}) ;
}
