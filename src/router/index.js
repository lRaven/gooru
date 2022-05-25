import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '@/views/PageHome'

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
				},
			},
			{
				path: 'parsers',
				name: 'parsers',
				component: TheParsers,
				meta: {
					title: 'Мои парсеры',
				},
			},
			{
				path: 'parsers/:id',
				name: 'parser',
				component: TheParser,
				meta: {
					title: 'Парсер',
				},
			},
			{
				path: 'favorites',
				name: 'favorites',
				component: TheFavorites,
				meta: {
					title: 'Избранное',
				},
			},
		],
	},

	{
		path: '/login',
		name: 'login',
		redirect: { name: 'cabinet' },
	},
	{
		path: '/registration',
		name: 'registration',
		redirect: { name: 'cabinet' },
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

export default router
