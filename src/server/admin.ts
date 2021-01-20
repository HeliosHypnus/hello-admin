import { get, post } from './request';
import API from '@/config/api.config'
// 获取用户列表
export const getAdmin = (params: object) => {
    return get(`${API.ADMINISTRATORS}`, params)
}
// 新增用户
export const addAdmin = (params: object) => {
    return post(`${API.ADMINISTRATORS}`, params)
}
// 角色列表
export const roleList = (params: object) => {
    return get(`${API.ROLES}`, params)
}
// 添加角色
export const adminRole = (params: object) => {
    return post(`${API.ROLES}`, params)
}
// 权限列表
export const permissionList = (params?: string | number) => {
    return get([API.PERMISSIONS, params].join('/'))
}

// 添加角色
export const addRole = (params: object) => {
    return post(`${API.ADDROLES}`, params)
}