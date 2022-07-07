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
import TheNewGroupParser from '@/components/Cabinet/Pages/TheNewGroupParser'

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
			//* тарифы 
			{
				path: 'rates',
				name: 'rates',
				component: TheRates,
				meta: {
					title: 'Тарифы',
					requiresAuth: true,
				},
			},
			//* обращения 
			{
				path: 'appeals',
				name: 'appeals',
				component: TheAppeals,
				meta: {
					title: 'Обращения',
					requiresAuth: true,
				},
			},
			//* обращение/чат
			{
				path: 'appeal',
				name: 'appeal',
				component: TheAppeal,
				meta: {
					title: 'Обращение',
					requiresAuth: true,
				},
			},
			//* parsources
			{
				path: 'parsources',
				name: 'parsources',
				component: TheParsources,
				meta: {
					title: 'Мои парсеры',
					requiresAuth: true,
				},
			},
			//* parsource 
			{
				path: 'parsource/:id',
				name: 'parsource',
				component: TheParsource,
				meta: {
					title: 'Парсер',
					requiresAuth: true,
				},
			},
			//* избранное 
			{
				path: 'favorites',
				name: 'favorites',
				component: TheFavorites,
				meta: {
					title: 'Избранное',
					requiresAuth: true,
				},
			},
			//* профиль
			{
				path: 'profile',
				name: 'profile',
				component: TheProfile,
				meta: {
					title: 'Мой профиль',
					requiresAuth: true,
				},
			},
			//* новый парсер
			{
				path: 'new_parser',
				name: 'new_parser',
				component: TheNewParser,
				meta: {
					title: 'Новый парсер',
					requiresAuth: true,
				},
			},
			//* новый парсер (группа url'ов)
			{
				path: 'new_group_parser',
				name: 'new_group_parser',
				component: TheNewGroupParser,
				meta: {
					title: 'Новая группа парсеров',
					requiresAuth: true,
				},
			},

			//* admin 
			//* юзеры
			{
				path: 'users',
				name: 'users',
				component: TheUsers,
				meta: {
					title: 'Пользователи',
					requiresAuth: true,
				},
			},
			//* страница юзера
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
