import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jsonp from 'jsonp'
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
			errorTxt:'',
			id:this.props.location.search?this.props.location.search.split("=")[1].split("&")[0]:'',
			tel:this.props.location.search?this.props.location.search.split("=")[2]:''
		};
		this.preview = this.preview.bind(this) ;
		this.closeProview = this.closeProview.bind(this) ;
		this.getDetail = this.getDetail.bind(this) ;
		this.formatData = this.formatData.bind(this) ;
  }
	
	preview(img){
		this.setState({
			previewImg:img
		})
	}
	closeProview(){
		this.setState({
			previewImg:""
		})
	}
	
	componentDidMount(){
		this.getDetail() ;
		// jsonp('https://apis.map.qq.com/ws/coord/v1/translate?locations=39.12,116.83;30.21,115.43&type=3&key=44YBZ-HO7KV-RZ7P2-U54DX-T36PF-UJF34', {}, function(res){
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
			images=''
		} = this.state.info ;
		return (
		<LoadingDiv loading={this.state.loading} errorTxt={this.state.errorTxt}>
			<div>
			  {/*图片查看器*/}
			  <PhotoView close={this.closeProview} img={this.state.previewImg}></PhotoView>
				
				{/*封面*/}
				<div className={style.cover} style={{'backgroundImage':'url('+title+')'}}>
					<div className={style.coverShadow}></div>
				</div>
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
					</div>
					
					{/*其他信息*/}
					<div className={style.otherInfo}>
						<div>
							<i className="icon icon1"></i>
							<p>{({Mortgage:'按揭', Full:'全款' })[payType]}</p>
						</div>
						<div>
							<i className="icon icon2"></i>
							<p>{storey}</p>
						</div>
						<div>
							{rent?(
							<React.Fragment>
								<i className="icon icon3"></i>
								<p>{rent}</p>
							</React.Fragment>):(
							<React.Fragment>
								<i className="icon"></i>
								<p></p>
							</React.Fragment>
							)
							}
						</div>
						<div>
						{returnRate?(<React.Fragment>
							<i className="icon icon4"></i>
							<p>{returnRate}</p>
						</React.Fragment>):(
							<React.Fragment>
								<i className="icon"></i>
								<p></p>
							</React.Fragment>
							)
						}
						</div>
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
							<span>查看楼盘资料</span>
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
