import * as Types from '../action-types';
import { Module } from 'vuex';
import { SettingState } from '@/tyings';
import {IGlobalState} from '..';

const state: SettingState = {
    isCollapse: false,
    activeMenu: '',
    theme: 'light'
};

const setting: Module<SettingState, IGlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.SET_COLLAPSE](state, payload: boolean){ // 设置展开收缩
            state.isCollapse = payload
        },
        [Types.SET_ACTIVEMENU](state, payload: string) { // 设置选中菜单
            state.activeMenu = payload
        },
        [Types.SET_THEME](state, payload: string) { // 主题设置
            state.theme = payload
        }
    }
};

export default setting