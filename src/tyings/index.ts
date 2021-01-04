/* 登录信息 */
export interface LoginState {
	access_token: string
    token_type: string
    expires_in: number
}
export interface AccountState {
    username: string
    password: string
}
export interface LoginInfo {
    tokenInfo: LoginState,
    account_info: AccountState
}
export interface UserInfo {
    // roles: [],
    // menu: [],
    username: ''
}
/* 菜单设置 */
export interface SettingState {
    isCollapse: boolean
    activeMenu: unknown[]
    theme: string
}
export enum LOGIN_types {
    ALL,
    VUE,
    NODE
}