import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '@/views/PageHome'

import PageLogin from '@/views/PageLogin'
import PageRegistration from '@/views/PageRegistration'

import PageCabinet from '@/views/PageCabinet'
import TheAppeals from '@/components/Cabinet/TheAppeals'

import TheParsources from '@/components/Cabinet/TheParsources'
import TheParsource from '@/components/Cabinet/TheParsource'

import TheFavorites from '@/components/Cabinet/TheFavorites'

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
		redirect: { name: 'appeals' },
		children: [
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
