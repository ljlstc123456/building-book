import React, { Component } from 'react';
import Swiper from '../../components/swiper'
import { withRouter } from 'react-router-dom';
import style from './index.module.scss'
import title from '../temp1/title.jpg'
import ShadowBox from '../../components/shadowBox'
import PhotoView from '../../components/photoView'
import LoadingDiv from '../../components/loadingDiv'
import $model from '../../api.js'
import androidIOS from '../../components/androidIOS'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			previewImg:"",
			info:{
			},
			photos:[],
			loading:true,
			showMore:false,
			errorTxt:'',
			id:this.props.location.search?this.props.location.search.split("=")[1].split("&")[0]:'',
			tel:this.props.location.search?this.props.location.search.split("=")[2]:''
		};
		
		this.getDetail = this.getDetail.bind(this) ;
		this.swiper = this.swiper.bind(this) ;
		this.formatData = this.formatData.bind(this) ;
		this.preview = this.preview.bind(this) ;
		// this.closeProview = this.closeProview.bind(this) ;
  }
	
	componentDidMount(){
		this.getDetail() ;
	}
	swiper(){
		var that = this ;
		var mySwiper = new Swiper('.swiper-container', {
			autoplay:true,
			on: {
				slideChangeTransitionEnd: function(){
					that.setState({
						activeIndex:this.activeIndex
					})
				}
			}
		})
	}
	getDetail(){
		var that = this;
		if(this.props.location.search){
			$model.project({id:this.state.id}).then(i=>{
				this.formatData(i.data)
			}).catch(i=>{
				this.setState({
					errorTxt:'找不到项目!'
				})
			})
		}else {
			androidIOS(that)
		}
	}
	
	formatData(data){
		let photos = [] ;
		data.albums.forEach((i)=> {
			photos = photos.concat(i.images)
		});
		this.setState({
			info:{...data},
			photos:photos,
			loading:false,
			errorTxt:false,
		},()=>{
			this.swiper()
		})
		let desc = data.houseTypes.map(i=>(i.name+" "+i.structureArea)).join(",") ;
		window.wx.updateAppMessageShareData({ 
		    title: `为您精心推荐,${data.name} ${data.priceRange} ${this.state.info.totalPrice}`, // 分享标题
		    desc: desc, // 分享描述
		    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: data.fileBaseUrl+data.image, // 分享图标
		    success: function () {
		      // 设置成功
		    }
		})
		
	}
	
	preview(img){
		window.wx.previewImage({
			current: img, // 当前显示图片的http链接
			urls:(this.state.info.houseTypes||[]).map(i=>(this.state.info.fileBaseUrl+i)) // 需要预览的图片http链接列表
		});
		// this.setState({
		// 	previewImg:img
		// })
	}
	// closeProview(){
	// 	this.setState({
	// 		previewImg:""
	// 	})
	// }
	
  render() {
		return (
		<LoadingDiv loading={this.state.loading} errorTxt={this.state.errorTxt}>
			<div>
				<PhotoView close={this.closeProview} img={this.state.previewImg}></PhotoView>
			  {/*banner*/}
				{this.state.photos?(
					<Swiper 
						imgs={this.state.photos.map(i=>(this.state.info.fileBaseUrl+i))}
					></Swiper>
				):null}
				<div style={{padding:'20px 20px 80px',position:'relative',zIndex:2,background:'#fff',marginTop:'250px'}}>
					{/*项目信息*/}
					<div className={style.projectName}>
						<span style={{marginRight:'5px'}}>{this.state.info.name}</span>
						<span className={style.tips}>{this.state.info.tag}</span>
					</div>
					<p className={style.minTitle}>{this.state.info.area+" "+this.state.info.location}</p>
					<p className={style.price}>{this.state.averagePrice}</p>
					<div className='detailInfo' style={{padding:'10px 0px'}}>
						<div>
							<label>占地:</label>
							<span>{this.state.info.totalArea}亩</span>
						</div>
						<div>
							<label>建面:</label>
							<span>{this.state.info.structureArea}㎡</span>
						</div>
						<div>
							<label>拿地:</label>
							<span>{(this.state.info.landTime||" ").split(" ")[0]}</span>
						</div>
						<div>
							<label>产权:</label>
							<span>{({Forty:'40年',Fifty:'50年',Seventy:'70年'})[this.state.info.propertyRight]}</span>
						</div>
						<div>
							<label>公摊:</label>
							<span>{this.state.info.pooled}%</span>
						</div>
						<div>
							<label>交房:</label>
							<span>{(this.state.info.checkOutTime||" ").split(" ")[0]}</span>
						</div>
						<div>
							<label>容积率:</label>
							<span>{this.state.info.plotRate}</span>
						</div>
						<div>
							<label>绿化率:</label>
							<span>{this.state.info.greeningRate}%</span>
						</div>
						{this.state.showMore?(
							<React.Fragment>
							<div>
								<label>总栋数:</label>
								<span>{this.state.info.totalBuildings}栋</span>
							</div>
							<div>
								<label>层高区间:</label>
								<span>{this.state.info.storeyRange}米</span>
							</div>
							<div>
								<label>总户数:</label>
								<span>{this.state.info.totalHouses}户</span>
							</div>
							<div>
								<label>物业费:</label>
								<span>{this.state.info.propertyFee}元/平米</span>
							</div>
							<div>
								<label>停车位:</label>
								<span>{this.state.info.parkingSpotCount}个</span>
							</div>
							<div>
								<label>项目现状:</label>
								<span>{this.state.info.situation}</span>
							</div>
							<div className="block">
								<label>在售楼栋:</label>
								<span>{this.state.info.onSaleBuildings}</span>
							</div>
							<div className="block">
								<label>开发企业:</label>
								<span>{this.state.info.developEnterprise}</span>
							</div>
							<div className="block">
								<label>物业企业:</label>
								<span>{this.state.info.propertyEnterprise}</span>
							</div>
							<div className="block">
								<label>开发银行:</label>
								<span>{this.state.info.developBank}</span>
							</div>
							</React.Fragment>
						):null}
					</div>
					<a href="javascript:;" onClick={()=>{this.setState({showMore:!this.state.showMore})}} className={style.more+" button button1"}>
						<span>{this.state.showMore?'收起更多信息':'更多项目信息'}</span>
					</a>
					<h3 className={style.imgTitle}>户型介绍({(this.state.info.houseTypes||[]).length})</h3>
					<div className={style.houseType}>
					{
						(this.state.info.houseTypes||[]).map(i=>{
							return (<div>
								<div onClick={()=>{this.preview(this.state.info.fileBaseUrl+i.image)}} className={style.img} style={{'backgroundImage':'url('+this.state.info.fileBaseUrl+i.image+')'}}></div>
								<p className={style.line1}>
									{i.name?<span>{i.name}</span>:null}
									{i.totalPrice?<span>约{i.totalPrice}/套</span>:null}
								</p>
								<p className={style.line2}>
									{i.structureArea?<span>建面 {i.structureArea} {i.direction}</span>:null}
									
									{/*<span className={style.tips}>住宅</span>*/}
								</p>
								<p className={style.line3}>
								{i.downPayment?<span>首付{i.downPayment}</span>:null}
								{i.monthlyPayment?<span> 月供{i.monthlyPayment}元</span>:null}
								</p>
							</div>)
						})
					}
					</div>
					<ShadowBox
						icon={1}
						title="项目卖点"
					>
						<pre>{this.state.info.sellingPoint}</pre>
					</ShadowBox>
					
					<div style={{marginTop:'20px'}}>
						<ShadowBox
							icon={1}
							title="周边配套"
						>
							<pre>{this.state.info.coupling}</pre>
						</ShadowBox>
					</div>
					
				</div>
				
				<div className={style.footer}>
					<a href={"tel:"+this.state.tel} className="button button2">
						<i className="icon icon5"></i>
						<span>联系销售员</span>
					</a>
				</div>
			</div>
			</LoadingDiv>
		)
  }
}

export default withRouter(Temp);
