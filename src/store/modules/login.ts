import { Module } from 'vuex';
import { LoginInfo, LoginState, AccountState } from '@/tyings';
import * as Types from '../action-types';
import {IGlobalState} from '..';
const state: LoginInfo = {
	tokenInfo: {
		access_token: '',
		expires_in: 0,
		token_type: ''
	},
	account_info: {
		username: '',
		password: ''
	}
};
// Module 参数第一个是自己的参数，第二个是全局参数
const login: Module<LoginInfo, IGlobalState> = {
	namespaced: true,
	state,
	mutations: {
		[Types.TOKENINFO](state, payload: LoginState) {
			state.tokenInfo = payload
		},
		[Types.LOGINACCOUNT](state, payload: AccountState) { // 登录账户
			state.account_info = payload
		}
	},
	actions: {
	}
};

export default login;
