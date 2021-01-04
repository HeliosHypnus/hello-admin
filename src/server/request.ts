import request from '@/config/axios.config';
/**
 * 封装get请求
 * @param {string} url 请求连接
 * @param {Object} params 请求参数
 * @param {Object} header 请求需要设置的header头
 */
export const get = (url: string, params: object, header?: {}) => {
    return request({
      url: url,
      method: 'get',
      data: params,
      headers: header
    })
  }
  
/**
 * 封装post请求
 * @param {string} url 请求连接
 * @param {Object} params 请求参数
 * @param {Object} header 请求的header头
 */
export const post = (url: string, params?: object, header?: {}) => {
    return request({
        url: url,
        method: 'post',
        data: params,
        headers: header
    })
}
  
/**
 * 封装put请求
 * @param {string} url 请求连接
 * @param {Object} params 请求参数
 * @param {Object} header 请求设置的header头
 */
export const put = (url: string, params: object, header?: {}) => {
    return request({
        url: url,
        method: 'put',
        data: params,
        headers: header
    })
}
  
/**
 * 封装delete请求
 * @param {string} url 请求连接
 * @param {Object} params 请求参数
 * @param {Object} header 请求设置的header头
 */
export const del = (url: string, params: object, header?: {}) => {
    return request({
        url: url,
        method: 'delete',
        data: params,
        headers: header
    })
}