import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import { withRouter } from 'react-router-dom';
import style from './index.module.scss'
// import $model from '@root/api.js'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			activeIndex:0
		};

  }
	
	componentDidMount(){
		var that = this 
    var mySwiper = new Swiper('.swiper-container', {
      direction : 'vertical',
			on: {
				slideChangeTransitionEnd: function(){
					that.setState({
						activeIndex:this.activeIndex
					})
				}
			},
    })
	}

  render() {
		return (
			<div className={style.sliderContainer+' swiper-container'}>
				<div className="swiper-wrapper">
					<div className={style.slider+' swiper-slide'}>
						<div className="animated shake" style={this.state.activeIndex == 0?{display:'block'}:{display:'none'}}>123123</div>	
					</div>
					<div className={style.slider+' swiper-slide'}>
						<div className="animated shake" style={this.state.activeIndex == 1?{display:'block'}:{display:'none'}}>456</div>	
					</div>
					<div className={style.slider+' swiper-slide'}>slider3</div>
				</div>
			</div>
		)
  }
}

export default withRouter(Temp);
