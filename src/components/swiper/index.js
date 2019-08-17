import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import { withRouter } from 'react-router-dom';
import style from './index.module.scss'
import 'swiper/dist/css/swiper.min.css'

class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			activeIndex:0
		};
  }
	
	componentDidMount(){
		//this.getDetail() ;
		this.swiper() ;
	}
	swiper = ()=>{
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
	
	preview = (img)=>{
		window.wx.previewImage({
			current: img, // 当前显示图片的http链接
			urls: this.props.imgs
		});
	}
	
  render() {
		return (
				<div className={style.sliderContainer+" swiper-container"}>
					<div className="swiper-wrapper">
					{this.props.imgs.map(i=>{
						return (
							<div className="swiper-slide">
								<div onClick={()=>{this.preview(i)}} className={style.img} style={{'backgroundImage':'url('+i+')'}}></div>
							</div>
						)
					})}
					</div>
					<div className={style.page}>
						{this.state.activeIndex+1} / {this.props.imgs.length}
					</div>
				</div>
		)
  }
}

export default withRouter(Temp);
