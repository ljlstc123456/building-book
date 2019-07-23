import React, { Component } from 'react';
import style from './index.module.scss'

const shadowBox = (props) => (
    <div className={style.box}>
			<div className={style.title}>
				<i className={style['icon'+props.icon]}></i>
				<span>{props.title}</span>
			</div>
      {props.children}
    </div>
);

export default shadowBox