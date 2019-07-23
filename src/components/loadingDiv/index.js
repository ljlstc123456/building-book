import React, { Component } from 'react';
import style from './index.module.scss'

const shadowBox = (props) => (
    <div>
			{props.loading?(
				<div className={style.loading}>
					<div></div>
					<p>胜利助手版权所有</p>
				</div>
			):props.children}
    </div>
);

export default shadowBox