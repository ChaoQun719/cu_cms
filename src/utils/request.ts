import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  AxiosError
} from 'axios';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中读取基础 URL
  timeout: Number(import.meta.env.VITE_API_TIMEOUT), // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前做一些处理，例如添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    const { status, data } = response;

    if (status === 200) {
      if (data.res === -1) {
        // 没有登录状态，跳转到登录页
        window.location.href = '/login';
      }
      else {
        return data; // 返回业务数据
      }
    } else {
      // 处理业务逻辑错误
      // console.log('处理业务逻辑错误');
      return Promise.reject(new Error(data.msg || '请求失败'));
    }
  },
  (error: AxiosError) => {
    // 对响应错误进行处理
    if (error.response) {
      // console.log('对响应错误进行处理');
      // 服务器返回的错误
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          window.location.href = '/login';
          break;
        case 404:
          return Promise.reject(new Error('请求资源不存在'));
        case 500:
          return Promise.reject(new Error('服务器错误'));
        default:
          return Promise.reject(new Error('网络错误'));
      }
    } else if (error.request) {
      // 请求未收到响应
      // console.log('请求未收到响应');
      return Promise.reject(new Error('网络连接失败'));
    } else {
      // 其他错误
      // console.log('其他错误');
      return Promise.reject(error);
    }
  }
);

// 封装通用的请求方法
const request = <T = any>(config: InternalAxiosRequestConfig): Promise<T> => {
  return instance.request<T, T>(config);
};

export default request;