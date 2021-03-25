import React, { Component } from 'react';
import style from './index.module.scss'

const shadowBox = (props) => (
    <div>
			{props.loading?(
				<div className={style.loading}>
					<div className={props.errorTxt?style.no:''}>{props.errorTxt||''}</div>
					<p>国合助手</p>
				</div>
			):props.children}
    </div>
);

export default shadowBox