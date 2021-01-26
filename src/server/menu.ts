import { get } from './request';
import API from '@/config/api.config'
// 获取菜单列表
export const getMenu = () => {
    return get(`${API.MENU}`)
}