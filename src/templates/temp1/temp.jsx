import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Swiper from '../../components/swiper'
import style from './index.module.scss'
import ShadowBox from '../../components/shadowBox'
import PhotoView from '../../components/photoView'
import LoadingDiv from '../../components/loadingDiv'
import $model from '../../api.js'
import title from './title.jpg'
import androidIOS from '../../components/androidIOS'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			previewImg:"",
			loading:true,
			info:{
				
			},
			lat:'',
			lng:'',
			errorTxt:'',
			id:this.props.location.search?this.props.location.search.split("=")[1].split("&")[0]:'',
			tel:this.props.location.search?this.props.location.search.split("=")[2]:''
		};
		this.preview = this.preview.bind(this) ;
		// this.closeProview = this.closeProview.bind(this) ;
		this.getDetail = this.getDetail.bind(this) ;
		this.formatData = this.formatData.bind(this) ;
  }
	
	preview(img){
		// this.setState({
		// 	previewImg:img
		// })
		window.wx.previewImage({
			current: img, // 当前显示图片的http链接
			urls: (this.state.info.images||"").split(',').map(i=>(this.state.info.fileBaseUrl+i))
		});
	}
	// closeProview(){
	// 	this.setState({
	// 		previewImg:""
	// 	})
	// }
	
	componentDidMount(){
		this.getDetail() ;
		// jsonp('https://apis.map.qq.com/ws/coord/v1/translate?locations=39.12,116.83;30.21,115.43&type=3&output=JSONP&key=44YBZ-HO7KV-RZ7P2-U54DX-T36PF-UJF34', {}, function(res){
		// 	console.log(res)
		// })
		// $model.lan({
		// 	locations:'39.12,116.83;30.21,115.43',
		// 	type:3,
		// 	key:'44YBZ-HO7KV-RZ7P2-U54DX-T36PF-UJF34'
		// })
	}
	
	getDetail(){
		var that = this;
		if(this.props.location.search){
			$model.product({id:this.state.id}).then(i=>{
				this.formatData(i.data)
				this.translate(i.data.coordinate) ;
			}).catch(i=>{
				this.setState({
					errorTxt:'找不到产品!'
				})
			})
		}else {
			androidIOS(that)
		}
	}
	
	formatData(data){
		this.setState({
			info:{...data},
			loading:false
		}) ;
		wx.updateAppMessageShareData({ 
		    title: `为您精心推荐,${data.area} ${data.houseTypeName||""} ${data.totalPrice||""}`, // 分享标题
		    desc: '点击查看优质房源', // 分享描述
		    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: data.fileBaseUrl+data.images.split(',')[0], // 分享图标
		    success: function () {
		      // 设置成功
		    }
		})
	}
	//打开地图
	openLocation = ()=>{
		if(this.state.lat && this.state.lng){
			window.wx.openLocation({
				latitude: this.state.lat, // 纬度，浮点数，范围为90 ~ -90
				longitude: this.state.lng, // 经度，浮点数，范围为180 ~ -180。
				name: '本案', // 位置名
				address: this.state.info.location, // 地址详情说明
				scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
			});
		}
	}
	//转换地址
	translate = (coordinate)=>{
		let c = coordinate.split(',') ;
		c = [c[1],c[0]].join(',') ;
		$model.translateXY({locations:c}).then(res=>{
			this.setState({
				lat:res.data.locations[0].lat,
				lng:res.data.locations[0].lng,
			})
		})
	}
  render() {
		let {
			projectId,
			houseTypeId,
			houseTypeName,
			houseNo,
			area,
			storey,
			price,
			totalPrice,
			payType,
			downPayment,
			monthlyPayment,
			rent,
			returnRate,
			cause,
			fileBaseUrl,
			location,
			images=''
		} = this.state.info ;
		return (
		<LoadingDiv loading={this.state.loading} errorTxt={this.state.errorTxt}>
			<div>
			  {/*图片查看器*/}
			  <PhotoView close={this.closeProview} img={this.state.previewImg}></PhotoView>
				
				{/*封面*/}
				{images?(<Swiper
					imgs={images.split(',').map(i=>(this.state.info.fileBaseUrl+i))}
				>
				</Swiper>):null}
				
				<div style={{zIndex:1,position:'relative'}}>
					{/*基本信息*/}
					<div className={style.baseInfo}>
						<div className={style.title}>{houseTypeName+" "+houseNo}</div>
						<ul className={style.info3}>
							<li>
								<p>{price}</p>
								<p>参考均价</p>
							</li>
							<li>
								<p>{totalPrice}</p>
								<p>参考总价</p>
							</li>
							{payType == 'Mortgage'?(
								<li>
									<p>{downPayment}</p>
									<p>首付</p>
								</li>
							):(<li></li>)
							}
							
						</ul>
					</div>
					
					<div style={{'background':'#F4F4F4',height:'4px'}}></div>
					
					{/*详细信息*/}
					<div className='detailInfo'>
						<div>
							<label>户型:</label>
							<span>{houseTypeName}</span>
						</div>
						<div>
							<label>建面:</label>
							<span>{area}</span>
						</div>
						{
							payType=='Mortgage'?(
							<React.Fragment>
								<div>
									<label>首付:</label>
									<span>{downPayment}</span>
								</div>
								<div>
									<label>月供:</label>
									<span>{monthlyPayment}</span>
								</div>
							</React.Fragment>):null
						}
						<div>
							<label>支付</label>
							<span>{({Mortgage:'按揭', Full:'全款' })[payType]}</span>
						</div>
						<div>
							<label>楼层</label>
							<span>{storey}</span>
						</div>
						{rent?(
						<div>
							<label>租金</label>
							<span>{rent}</span>
						</div>):null
						}
						{returnRate?(
						<div>
							<label>回报率</label>
							<span>{returnRate}</span>
						</div>
						):null
						}
					</div>
					{/*地址*/}
					<div className={style.location} onClick={this.openLocation}>
					 <p>
						{location}>
					 </p>
					</div>
					{/*推荐理由*/}
					<div style={{padding:'0 20px 30px',background:'#fff'}}>
					 {cause?(<ShadowBox
							icon={1}
							title="推荐理由"
						>
							<pre>{cause}</pre>
						</ShadowBox>):null}
					</div>
					
					{/*产品图片*/}
					{
						images&&<h3 className={style.imgTitle}>产品图片({images.split(',').length})</h3>
					}
					
					
					<div className={style.imgWrap}>
						{
							images&&images.split(',').map(i=><div onClick={()=>{this.preview(fileBaseUrl+i)}}><img src={fileBaseUrl+i}/></div>)
						}
					</div>
					
					<div className={style.footer}>
						<a href={"#/building?id="+projectId+"&tel="+this.state.tel} className="button button1">
							<i className="icon icon2"></i>
							<span>查看楼盘详情</span>
						</a>
						<a href={"tel:"+this.state.tel} className="button button2">
							<i className="icon icon5"></i>
							<span>联系销售员</span>
						</a>
					</div>
					
				</div>
			</div>
		</LoadingDiv>
		)
  }
}

export default withRouter(Temp);
