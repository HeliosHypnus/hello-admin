import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";
import Login from "@/views/Login.vue";
import Main from '@/components/layout/main/main.vue'

const routes: Array<RouteRecordRaw> = [
{
	path: "/",
	name: "Home",
	component: Home,
	redirect: '/login',
	children: [
		{
			path: '/index',
			name: "Index",
			meta: {
				title: 'Index',
				icon: 'icon-deploy'
			},
			component: () =>
			import(/* webpackChunkName: "index" */ "@/views/index/index.vue"),
		},
		{
			path: "/admin",
			name: "Admin",
			meta: {
				title: 'Admin',
				icon: 'icon-peizhi'
			},
			component: Main,
			children: [
				{
					path: 'user',
					name: 'User',
					meta: {
						title: 'User',
						icon: 'icon-deploy'
					},
					component: () =>
					import(/* webpackChunkName: "user" */ "@/views/user/index.vue"),
				},
				{
					path: 'role',
					name: 'role',
					meta: {
						title: 'Role',
						icon: 'icon-deploy'
					},
					component: () =>
					import(/* webpackChunkName: "role" */ "@/views/role/index.vue"),
				},
				{
					path: 'menu',
					name: 'menu',
					meta: {
						title: 'Menu',
						icon: 'icon-deploy'
					},
					component: () =>
					import(/* webpackChunkName: "menu" */ "@/views/menu/index.vue"),
				},
			]
		}
	]
},
{
	path: "/login",
	name: "Login",
	component: Login,
}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
