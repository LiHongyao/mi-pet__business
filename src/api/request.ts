import axios, { AxiosRequestConfig } from 'axios';
import Cookie from '../utils/cookie';
import { Toast } from 'antd-mobile';

// methods
// creeate instance
const service = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  timeout: 100000
});

// request interceptors
service.interceptors.request.use(
  config => {
    Toast.loading('加载中，请稍后...', 1000000);
    // config headers
    config.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookie.get('token')}`
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// response interceptors
export interface AxiosResponse<T = any> {
  data: T; // 服务端返回的数据
  status: number; // HTTP 状态码
  statusText: string; // 状态消息
  headers: any; // 响应头
  config: AxiosRequestConfig; // 请求配置对象
  request: any; // 请求的 XMLHttpRequest 对象实例
}


service.interceptors.response.use(
  response => {
    Toast.hide();
    if(response.status === 200) {
      const status = response.data.status;
      if(status === 200) {
        return response.data;
      }else if(status === 401){
        window.location.href = window.location.origin + '/auth/jump';
        sessionStorage.pathname = window.location.pathname;
        return Promise.reject('error');
      }else {
        Toast.info(response.data.msg);
        return Promise.reject('error');
      }
    }else {
      Toast.info('服务器异常，请稍后再试！');
      return Promise.reject();
    }
  },
  error => {
    Toast.hide();
    /timeout/.test(error.message) && Toast.info('请求超时，请检查网络设置');
    return Promise.reject(error);
  }
);


export default service;



