/*
 * @Author: nds
 */
import axios from "axios";
import React, { Component } from 'react';
import { Message } from '@alifd/next';
import moment from 'moment';
// import { Loading } from 'element-ui';

axios.defaults.withCredentials = true;

let QQmapKey = '44YBZ-HO7KV-RZ7P2-U54DX-T36PF-UJF34'
const instance = axios.create({
	timeout: 60000,
	withCredentials: false,
	headers: {
		"content-type": "application/json;charset=utf-8"
	}
});

let baseURL = '';
switch (process.env.NODE_ENV) {
	case 'development':
	  //baseURL = '192.168.137.22:9527/clinic_web';
		baseURL = 'http://sta.api.sunland.vip';
		break;
	case 'qa':
		baseURL = "/api";
		break;
	case 'qa2':
		baseURL = "/api";
		break;
	case 'qa-sz':
		baseURL = "/api";
		break;
	case 'production':
		baseURL = 'http://sta.api.sunland.vip';
		break;
	case 'test1':
		// baseURL = "http://qa.enterprise.h.idoumeng.cn/front";
		baseURL = "/api";
		break;
	default:
		baseURL = "/api";
		break;
}
// var loadingInstance  = {
// 	close: function(){},
// }
instance.interceptors.request.use((async (req) => {
	
	return req;
}));


instance.interceptors.response.use((res) => {

	if (res.status == 200) {
		if (!res.data.success || !res.data.data) {
			return Promise.reject();
		}
		return res.data;
	}
}, (error) => {
	return Promise.reject();
});


const makePost = (url) => {
	return (params, showLoading = true) => {
		if(showLoading){
			//loadingInstance = Loading.service({ fullscreen: true });
		}
		return instance.post(`${baseURL}${url}`, {...params})
	};
}

const makeGet = (url,type="param") => {
	return (params={}, showLoading = true) => {
		if(showLoading){
			//loadingInstance = Loading.service({ fullscreen: true });
		}
		var paramUrl = Object.keys(params).map((key)=>{
        // body...
        return encodeURIComponent(key) + "=" + (type=='notranslate'?params[key]:encodeURIComponent(params[key]));
    }).join("&");
		
		if(type == 'param' || type=='notranslate') {
			return instance.get(`${baseURL}${url}?${paramUrl}`)
		} else {
			//console.log(params) ;
			return instance.get(`${baseURL}${url}/${params.id}`)
		}
		
	};
}

const makePut = (url,type="param") => {
	return (params, showLoading = true) => {
		if(showLoading){
			//loadingInstance = Loading.service({ fullscreen: true });
		}
		if(type == 'param') {
			return instance.put(`${baseURL}${url}`, {...params})
		}else {
			return instance.put(`${baseURL}${url}/${params.id}`)
		}
		
	};
}

const makeDelete = (url) => {
	return (params, showLoading = true) => {
		
		if(showLoading){
			//loadingInstance = Loading.service({ fullscreen: true });
		}
		return instance.delete(`${baseURL}${url}/${params.id}`)
	};
}



export default {
	//产品详情
	product: makeGet('/project/product','path'),
	//项目详情
	project: makeGet('/project','path'),
	//translate
	translateXY:makeGet('/home/location/translate'),
	//获取微信签名
	wxSign:makeGet('/home/wx/sign')
}
