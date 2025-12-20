// src/api/request.ts
import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
  // 替换为你的本地后端地址
  baseURL: '/api', 
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 LocalStorage 获取 token (建议登录后存入)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数
    return response.data;
  },
  (error) => {
    // 处理 401 未登录、500 错误等
    if (error.response && error.response.status === 401) {
      console.error('登录失效，请重新登录');
      // 这里可以做路由跳转到登录页
    }
    return Promise.reject(error);
  }
);

export default service;