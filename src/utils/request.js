import axios from "axios";
import { Message } from "element-ui";
//创建axios,赋给变量service
const BASEUTL = process.env.NODE_ENV === "production" ? "" : "devapi";
const service = axios.create({
  baseURL: BASEUTL,
  timeout: 15000 //超时时间
});
// 添加请求拦截器
/**
 * 请求接口前
 */
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //Token
    console.log(config.headers);
    //根据业务需求添加
    //config.headers["Tokey"] = "11111";
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
/**
 * 请求接口后返回数据进行拦截
 */
// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
      //return Promise.resolve（data);
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;

/**
 * 使用export default时，但不能同时多个存在
 * 文件 import 不需要花括号，
 */
