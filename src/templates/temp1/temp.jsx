import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import style from './index.module.scss'
import ShadowBox from '../../components/shadowBox'
import PhotoView from '../../components/photoView'
import $model from '../../api.js'
import title from './title.jpg'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			previewImg:"",
			showInfo:{
				"projectId": 0,
				"houseTypeId": 0,
				"houseTypeName": "",
				"houseNo": "",
				"area": "",
				"storey": "",
				"price": "",
				"totalPrice": "",
				"payType": "",
				"downPayment": "",
				"monthlyPayment": "",
				"rent": "",
				"returnRate": "",
				"cause": "",
				"images": ""
			}
		};
		this.preview = this.preview.bind(this) ;
		this.closeProview = this.closeProview.bind(this) ;
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
		
	}

  render() {
		return (
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
						<div className={style.title}>房号25-02</div>
						<ul className={style.info3}>
							<li>
								<p>5000元/㎡</p>
								<p>参考均价</p>
							</li>
							<li>
								<p>5000元/㎡</p>
								<p>参考均价</p>
							</li>
							<li>
								<p>5000元/㎡</p>
								<p>参考均价</p>
							</li>
						</ul>
					</div>
					
					<div style={{'background':'#F4F4F4',height:'4px'}}></div>
					
					{/*详细信息*/}
					<div className='detailInfo'>
						<div>
							<label>户型:</label>
							<span>3/4局势</span>
						</div>
						<div>
							<label>户型:</label>
							<span>3/4局势</span>
						</div>
						<div>
							<label>户型:</label>
							<span>3/4局势</span>
						</div>
						<div>
							<label>户型:</label>
							<span>3/4局势</span>
						</div>
					</div>
					
					{/*其他信息*/}
					<div className={style.otherInfo}>
						<div>
							<i className="icon icon1"></i>
							<p>按揭</p>
						</div>
						<div>
							<i className="icon icon2"></i>
							<p>4/35层</p>
						</div>
						<div>
							<i className="icon icon3"></i>
							<p>5680元</p>
						</div>
						<div>
							<i className="icon icon4"></i>
							<p>30%</p>
						</div>
					</div>
					
					{/*推荐理由*/}
					<div style={{padding:'0 20px 30px',background:'#fff'}}>
						<ShadowBox
							icon={1}
							title="推荐理由"
						>
							<p>1.价格低于周边1000元/平左右；</p>
							<p>2.户型均为朝南方向；</p>
							<p>3.绿化率高达35%,小区外即使天井河流；</p>
							<p>4.离高铁站仅3分钟车程。</p>
						</ShadowBox>
					</div>
					
					{/*产品图片*/}
					<h3 className={style.imgTitle}>产品图片(3)</h3>
					
					<div className={style.imgWrap}>
						{
							Array.from({length:10}).map(i=><div onClick={()=>{this.preview(title)}}><img src={title}/></div>)
						}
					</div>
					
					<div className={style.footer}>
						<a href="javascript:;" className="button button1">
							<i className="icon icon2"></i>
							<span>查看楼盘资料</span>
						</a>
						<a href="javascript:;" className="button button2">
							<i className="icon icon5"></i>
							<span>联系销售员</span>
						</a>
					</div>
					
				</div>
			</div>
		)
  }
}

export default withRouter(Temp);
