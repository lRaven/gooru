import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/PageHome'

import PageLogin from '@/views/PageLogin'
import PageRegistration from '@/views/PageRegistration'

//* cabinet 
import PageCabinet from '@/views/PageCabinet'

import PageRates from '@/views/CabinetPages/PageRates'
import PageAppeals from '@/views/CabinetPages/PageAppeals'
import PageAppeal from '@/views/CabinetPages/PageAppeal'

import PageParsources from '@/views/CabinetPages/PageParsources'
import PageParsource from '@/views/CabinetPages/PageParsource'

import PageFavorites from '@/views/CabinetPages/PageFavorites'

import PageProfile from '@/views/CabinetPages/PageProfile'

import PageNewParser from '@/views/CabinetPages/PageNewParser'
import PageNewGroupParser from '@/views/CabinetPages/PageNewGroupParser'

//* admin pages
import PageUsers from '@/views/CabinetPages/PageUsers'
import PageUser from '@/views/CabinetPages/PageUser'
import PageControl from '@/views/CabinetPages/PageControl';
//*

import PageBrief from '@/views/PageBrief'

import PageNotFound from '@/views/PageNotFound'

const routes = [
	{
		path: '/',
		name: 'home',
		component: PageHome,

		meta: {
			title: 'Gooru',
			requiresAuth: false,
		}
	},

	{
		path: '/cabinet',
		name: 'cabinet',

		component: PageCabinet,

		meta: {
			title: 'Личный кабинет',
		},
		children: [
			//* тарифы 
			{
				path: 'rates',
				name: 'rates',
				component: PageRates,
				meta: {
					title: 'Тарифы',
					requiresAuth: true,
				},
			},
			//* обращения 
			{
				path: 'appeals',
				name: 'appeals',
				component: PageAppeals,
				meta: {
					title: 'Обращения',
					requiresAuth: true,
				},
			},
			//* обращение/чат
			{
				path: 'appeal',
				name: 'appeal',
				component: PageAppeal,
				meta: {
					title: 'Обращение',
					requiresAuth: true,
				},
			},
			//* parsources
			{
				path: 'parsources',
				name: 'parsources',
				component: PageParsources,
				meta: {
					title: 'Мои парсеры',
					requiresAuth: true,
				},
			},
			//* parsource 
			{
				path: 'parsource/:id',
				name: 'parsource',
				component: PageParsource,
				meta: {
					title: 'Парсер',
					requiresAuth: true,
				},
			},
			//* избранное 
			{
				path: 'favorites',
				name: 'favorites',
				component: PageFavorites,
				meta: {
					title: 'Избранное',
					requiresAuth: true,
				},
			},
			//* профиль
			{
				path: 'profile',
				name: 'profile',
				component: PageProfile,
				meta: {
					title: 'Мой профиль',
					requiresAuth: true,
				},
			},
			//* новый парсер
			{
				path: 'new_parser',
				name: 'new_parser',
				component: PageNewParser,
				meta: {
					title: 'Новый парсер',
					requiresAuth: true,
				},
			},
			//* новый парсер (группа url'ов)
			{
				path: 'new_group_parser',
				name: 'new_group_parser',
				component: PageNewGroupParser,
				meta: {
					title: 'Новая группа парсеров',
					requiresAuth: true,
				},
			},

			//* admin 
			//* юзеры
			{
				path: 'control',
				name: 'control',
				component: PageControl,
				meta: {
					title: 'Управление',
					requiresAuth: true,
				},
			},
			{
				path: 'users',
				name: 'users',
				component: PageUsers,
				meta: {
					title: 'Пользователи',
					requiresAuth: true,
					isNotForDefaultUser: true,
				},
			},
			//* страница юзера
			{
				path: 'user/:id',
				name: 'user',
				component: PageUser,
				meta: {
					title: 'Пользователь',
					requiresAuth: true,
					isNotForDefaultUser: true,
				},
			},
		],
	},

	{
		path: '/login',
		name: 'login',
		component: PageLogin,
		meta: {
			title: 'Авторизация',
			requiresAuth: false,
		},

	},
	{
		path: '/registration',
		name: 'registration',
		component: PageRegistration,
		meta: {
			title: 'Регистрация',
			requiresAuth: false,
		},
	},

	{
		path: '/brief',
		name: 'brief',
		component: PageBrief,
		meta: {
			title: 'Бриф',
			requiresAuth: false,
		}
	},

	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: PageNotFound,

		meta: {
			title: '404',
		}
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to) => {
	if (to.meta.requiresAuth === true) {
		if (localStorage.getItem('userAuth') !== 'yes') {
			return { name: 'login' }
		} else if (to.meta.isNotForDefaultUser && localStorage.getItem('role') === 'DefaultUser') {
			//* если user.role === DefaultUser, а страница не доступна для DefaultUser, то редирект на дефолтную страницу 
			return { name: 'cabinet' }
		}
		else return true
	}
})

export default router
