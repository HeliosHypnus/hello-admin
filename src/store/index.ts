import { LoginInfo, SettingState } from "@/tyings";
import { createStore } from "vuex";
import login  from './modules/login';
import setting  from './modules/setting';

// 所有页面或者模块定义
export interface IGlobalState {
  login: LoginInfo
  setting: SettingState
}
const store = createStore<IGlobalState>({
  mutations: {},
  actions: {},
  modules: {
    login,
    setting
  }
});
export default store;
