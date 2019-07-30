import React, { Component } from 'react';
import style from './index.module.scss'
import Hammer from 'hammerjs'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			scale:1,
			x:0,
			y:0,
			oldX:0,
			oldY:0
		};
		this.myRef = React.createRef();
  }
	
	
	componentDidMount(){
		//this.myRef.current ;
		var that = this ;
		const hammertime = new Hammer(this.myRef.current);
		hammertime.get('pinch').set({ enable: true });
		hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
		hammertime.on('tap', function(ev) {
			setTimeout(function(){
			  //很多处理比如隐藏什么的
				that.props.close()
				that.setState({
					scale:1,
					x:0,
					y:0,
					oldX:0,
					oldY:0
				})
			},320);
			
		});
		hammertime.on('pinchin', function(ev) {
			that.setState({
				scale:(that.state.scale - 0.1)<=1?1:(that.state.scale - 0.1),
				x:(that.state.scale - 0.1)<=1?0:that.state.x,
				y:(that.state.scale - 0.1)<=1?0:that.state.y,
				oldX:(that.state.scale - 0.1)<=1?0:that.state.oldX,
				oldY:(that.state.scale - 0.1)<=1?0:that.state.oldY
			})
			
		});
		hammertime.on('pinchout', function(ev) {
			that.setState({
				scale:(that.state.scale + 0.1)>=3?3:(that.state.scale + 0.1)
			})
		});
		hammertime.on('panstart', function(ev) {
			//console.log(ev)
		});
		hammertime.on('panmove', function(ev) {
			if(that.state.scale == 1){
				return ;
			}
			that.setState({
				x:that.state.oldX+ev.deltaX,
				y:that.state.oldY+ev.deltaY
			})
			//console.log(ev.deltaX,ev.deltaY)
		});
		hammertime.on('panend', function(ev) {
			that.setState({
				oldX:that.state.oldX+ev.deltaX,
				oldY:that.state.oldY+ev.deltaY
			})
			ev.preventDefault()
			//console.log(ev)
		});
		//console.log(Hammer) ;
	}

  render() {
		return (
			<div className={style.container} ref={this.myRef} style={{display:this.props.img?'block':'none'}}>
				<img src={this.props.img} style={{transform: `scale(${this.state.scale})`,left:`${this.state.x}px`,top:`${this.state.y}px`}}/>
			</div>
		)
  }
}

export default Temp;
