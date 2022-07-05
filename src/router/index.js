import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '@/views/PageHome'

import PageLogin from '@/views/PageLogin'
import PageRegistration from '@/views/PageRegistration'

//* cabinet 
import PageCabinet from '@/views/PageCabinet'

import TheRates from '@/components/Cabinet/Pages/TheRates'
import TheAppeals from '@/components/Cabinet/Pages/TheAppeals'
import TheAppeal from '@/components/Cabinet/Pages/TheAppeal'

import TheParsources from '@/components/Cabinet/Pages/TheParsources'
import TheParsource from '@/components/Cabinet/Pages/TheParsource'

import TheFavorites from '@/components/Cabinet/Pages/TheFavorites'

import TheProfile from '@/components/Cabinet/Pages/TheProfile'

import TheNewParser from '@/components/Cabinet/Pages/TheNewParser'

//* admin pages
import TheUsers from '@/components/Cabinet/Pages/TheUsers'
import TheUser from '@/components/Cabinet/Pages/TheUser'
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
			{
				path: 'rates',
				name: 'rates',
				component: TheRates,
				meta: {
					title: 'Тарифы',
					requiresAuth: true,
				},
			},
			{
				path: 'appeals',
				name: 'appeals',
				component: TheAppeals,
				meta: {
					title: 'Обращения',
					requiresAuth: true,
				},
			},
			{
				path: 'appeal',
				name: 'appeal',
				component: TheAppeal,
				meta: {
					title: 'Обращение',
					requiresAuth: true,
				},
			},
			{
				path: 'parsources',
				name: 'parsources',
				component: TheParsources,
				meta: {
					title: 'Мои парсеры',
					requiresAuth: true,
				},
			},
			{
				path: 'parsource/:id',
				name: 'parsource',
				component: TheParsource,
				meta: {
					title: 'Парсер',
					requiresAuth: true,
				},
			},
			{
				path: 'favorites',
				name: 'favorites',
				component: TheFavorites,
				meta: {
					title: 'Избранное',
					requiresAuth: true,
				},
			},
			{
				path: 'profile',
				name: 'profile',
				component: TheProfile,
				meta: {
					title: 'Мой профиль',
					requiresAuth: true,
				},
			},
			{
				path: 'new_parser',
				name: 'new_parser',
				component: TheNewParser,
				meta: {
					title: 'Новый парсинг',
					requiresAuth: true,
				},
			},
			//* admin 
			{
				path: 'users',
				name: 'users',
				component: TheUsers,
				meta: {
					title: 'Пользователи',
					requiresAuth: true,
				},
			},
			{
				path: 'user/:id',
				name: 'user',
				component: TheUser,
				meta: {
					title: 'Пользователь',
					requiresAuth: true,
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
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to) => {
	if (to.meta.requiresAuth === true) {
		if (localStorage.getItem('userAuth') !== 'yes') {
			return { name: 'login' }
		} else return true
	}
})

export default router
