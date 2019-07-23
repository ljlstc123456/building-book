import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import { withRouter } from 'react-router-dom';
import style from './index.module.scss'
import 'swiper/dist/css/swiper.min.css'
import title from '../temp1/title.jpg'
import ShadowBox from '../../components/shadowBox'
import LoadingDiv from '../../components/loadingDiv'
import $model from '../../api.js'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			activeIndex:0,
			info:{
			},
			photos:[],
			loading:true,
			showMore:false
		};
		
		this.getDetail = this.getDetail.bind(this) ;
		this.swiper = this.swiper.bind(this) ;
		this.formatData = this.formatData.bind(this) ;
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
			$model.project({id:this.props.location.search.split("=")[1]}).then(i=>{
				this.formatData(i.data)
			})
		}else {
			//全局回调
			window.setInfo = function(data){
				that.formatData(data)
			}
			if('onJsLoadCompleted' in window){//触发android
				window.onJsLoadCompleted()
			} else{//触发ios
				window.webkit.messageHandlers.onJsLoadCompleted.postMessage('')
			}
		}
	}
	
	formatData(data){
		this.setState({
			info:{...data},
			photos:data.albums.map(i=>i.images).flat(),
			loading:false
		},()=>{
			this.swiper()
		})
	}
  render() {
		return (
		<LoadingDiv loading={this.state.loading}>
			<div>
			  {/*banner*/}
				<div className={style.sliderContainer+" swiper-container"}>
					<div className="swiper-wrapper">
					{this.state.photos.map(i=>{
						return (
							<div className="swiper-slide">
								<div className={style.img} style={{'backgroundImage':'url('+this.state.info.fileBaseUrl+i+')'}}></div>
							</div>
						)
					})}
					</div>
					<div className={style.page}>
						{this.state.activeIndex+1} / {this.state.photos.length}
					</div>
				</div>
				
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
							<span>{this.state.info.totalArea}</span>
						</div>
						<div>
							<label>建面:</label>
							<span>{this.state.info.structureArea}</span>
						</div>
						<div>
							<label>拿地:</label>
							<span>{(this.state.info.landTime||" ").split(" ")[0]}</span>
						</div>
						<div>
							<label>产权:</label>
							<span>{({Forty:'40年',Seventy:'70年'})[this.state.info.propertyRight]}</span>
						</div>
						<div>
							<label>公摊:</label>
							<span>{this.state.info.pooled}</span>
						</div>
						<div>
							<label>交房:</label>
							<span>{(this.state.info.checkOutTime||" ").split(" ")[0]}</span>
						</div>
						<div>
							<label>容积率:</label>
							<span>{this.state.info.plotRate}%</span>
						</div>
						<div>
							<label>绿化率:</label>
							<span>{this.state.info.greeningRate}%</span>
						</div>
						{this.state.showMore?(
							<React.Fragment>
							<div>
								<label>总栋数:</label>
								<span>{this.state.info.totalBuildings}</span>
							</div>
							<div>
								<label>层高区间:</label>
								<span>{this.state.info.storeyRange}</span>
							</div>
							<div>
								<label>总户数:</label>
								<span>{this.state.info.totalHouses}</span>
							</div>
							<div>
								<label>物业费:</label>
								<span>{this.state.info.propertyFee}</span>
							</div>
							<div>
								<label>停车位:</label>
								<span>{this.state.info.parkingSpotCount}</span>
							</div>
							<div>
								<label>项目现状:</label>
								<span>{this.state.info.situation}</span>
							</div>
							<div style={{width:'100%'}}>
								<label>在售楼栋:</label>
								<span>{this.state.info.onSaleBuildings}</span>
							</div>
							<div style={{width:'100%'}}>
								<label>开发企业:</label>
								<span>{this.state.info.developEnterprise}</span>
							</div>
							<div style={{width:'100%'}}>
								<label>物业企业:</label>
								<span>{this.state.info.propertyEnterprise}</span>
							</div>
							<div style={{width:'100%'}}>
								<label>开发银行:</label>
								<span>{this.state.info.developBank}</span>
							</div>
							</React.Fragment>
						):null}
					</div>
					<a href="javascript:;" onClick={()=>{this.setState({showMore:!this.state.showMore})}} className={style.more+" button button1"}>
						<span>{this.state.showMore?'收起更多信息':'更多项目信息'}</span>
					</a>
					<h3 className={style.imgTitle}>户型介绍(3)</h3>
					<div className={style.houseType}>
					{
						(this.state.info.houseTypes||[]).map(i=>{
							return (<div>
								<div className={style.img} style={{'backgroundImage':'url('+this.state.info.fileBaseUrl+i.image+')'}}></div>
								<p className={style.line1}>
									<span>{i.name}</span>
									<span>约{i.totalPrice}/套</span>
								</p>
								<p className={style.line2}>
									<span>建面 {i.structureArea} {i.direction}</span>
									<span className={style.tips}>住宅</span>
								</p>
								<p className={style.line3}>
									<span>首付{i.downPayment}</span>
									<span> 月供{i.monthlyPayment}元</span>
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
					<a href="javascript:;" className="button button2">
						<i className="icon icon5"></i>
						<span>159821113780</span>
					</a>
				</div>
			</div>
			</LoadingDiv>
		)
  }
}

export default withRouter(Temp);
