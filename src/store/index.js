import { createStore } from 'vuex'

import rates from '@/store/modules/rates'

import brief from '@/store/modules/brief'

import cabinet from '@/store/modules/cabinet'
import navigation_panel from '@/store/modules/navigation_panel'
import stats from '@/store/modules/stats'
import appeals from '@/store/modules/appeals'
import parsers from '@/store/modules/parsers'
import favorites from '@/store/modules/favorites'

import messenger from '@/store/modules/messenger'

//* admin data
import users from '@/store/modules/admin/users'
import users_managers from '@/store/modules/admin/users_managers'

export default createStore({
	state: () => ({
		document_width: null,
		baseURL: 'http://0.0.0.0:8003',
	}),

	getters: {
		BASEURL_WITHOUT_PROTOCOL(state) {
			if (state.baseURL.startsWith('https://')) { return state.baseURL.slice(8) }

			if (state.baseURL.startsWith('http://')) { return state.baseURL.slice(7) }
		}
	},

	mutations: { 
		SET_DOCUMENT_WIDTH: (state, payload) => state.document_width = payload ,
	},

	actions: {
		getDocumentWidth: async (context) => {
			await context.commit('SET_DOCUMENT_WIDTH', document.documentElement.clientWidth);
			await window.addEventListener("resize", () => {
				setTimeout(() => {
					context.commit('SET_DOCUMENT_WIDTH', document.documentElement.clientWidth);
				}, 500);
			});
		},
	},

	modules: {
		rates,
		brief,
		cabinet,
		navigation_panel,

		stats,
		appeals,
		parsers,
		favorites,
		messenger,

		users,
		users_managers,
	}
})
