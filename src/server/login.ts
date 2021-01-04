import { post } from './request';
import API from '@/config/api.config'

export const login = (params: object) => {
    return post(`${API.LOGIN}`, params)
}

export const logout = () => {
    return post(`${API.LOGUT}`)
}