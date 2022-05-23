import { createRouter, createWebHashHistory } from 'vue-router'
import PageHome from '@/views/PageHome'

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

		component: () => import(/* webpackChunkName: "cabinet" */ '@/views/PageCabinet'),

		meta: {
			title: 'Cabinet',
		},
		redirect: { name: 'appeals' },
		children: [
			{
				path: 'appeals',
				name: 'appeals',
				component: () => import(/* webpackChunkName: "cabinet/parsers" */ '@/components/Cabinet/TheAppeals'),
			},
			{
				path: 'parsers',
				name: 'parsers',
				component: () => import(/* webpackChunkName: "cabinet/parsers" */ '@/components/Cabinet/TheParsers'),
			},
			{
				path: 'parsers/parser/:id',
				name: 'parser',
				component: () => import(/* webpackChunkName: "cabinet/parsers/parser" */ '@/components/Cabinet/TheParser'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import(/* webpackChunkName: "not_found" */ '@/views/PageNotFound'),

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
