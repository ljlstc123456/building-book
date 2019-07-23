import React, { Component } from 'react';
import style from './index.module.scss'
import Hammer from 'hammerjs'
class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = {
			scale:1
		};
		this.myRef = React.createRef();

  }
	
	componentDidMount(){
		//this.myRef.current ;
		var that = this ;
		const hammertime = new Hammer(this.myRef.current);
		hammertime.get('pinch').set({ enable: true });
		hammertime.on('tap', function(ev) {
			that.props.close()
		});
		hammertime.on('pinchin', function(ev) {
			that.setState({
				scale:(that.state.scale - 0.1)<=1?1:(that.state.scale - 0.1)
			})
		});
		hammertime.on('pinchout', function(ev) {
			that.setState({
				scale:(that.state.scale + 0.1)>=3?3:(that.state.scale + 0.1)
			})
		});
		hammertime.on('panstart', function(ev) {
			console.log(ev)
		});
		hammertime.on('panmove', function(ev) {
			console.log(ev)
		});
		hammertime.on('panend', function(ev) {
			console.log(ev)
		});
		//console.log(Hammer) ;
	}

  render() {
		return (
			<div className={style.container} ref={this.myRef} style={{display:this.props.img?'block':'none'}}>
				<img src={this.props.img} style={{transform: `scale(${this.state.scale})`}}/>
			</div>
		)
  }
}

export default Temp;
