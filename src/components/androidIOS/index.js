export default function(that){
	//全局回调
	window.setInfo = function(data,tel){
		that.formatData(JSON.parse(data))
		that.setState({
			tel:tel
		})
	}
	if('native' in window){//触发android
		window.native.onJsLoadCompleted()
	} else{//触发ios
		try{
			window.webkit.messageHandlers.onJsLoadCompleted.postMessage('')
		}catch(e){}
		
	}
}