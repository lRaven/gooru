import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '@/views/PageHome'

import PageLogin from '@/views/PageLogin'
import PageRegistration from '@/views/PageRegistration'

import PageCabinet from '@/views/PageCabinet'
import TheAppeals from '@/components/Cabinet/TheAppeals'

import TheParsers from '@/components/Cabinet/TheParsers'
import TheParser from '@/components/Cabinet/TheParser'

import TheFavorites from '@/components/Cabinet/TheFavorites'

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
				path: 'parsers',
				name: 'parsers',
				component: TheParsers,
				meta: {
					title: 'Мои парсеры',
					requiresAuth: true,
				},
			},
			{
				path: 'parsers/:id',
				name: 'parser',
				component: TheParser,
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
	else return true
})

export default router
