import { createStore } from 'vuex'

import brief from '@/store/modules/brief'

//* cabinet 
import cabinet from '@/store/modules/cabinet/cabinet'
import navigation_panel from '@/store/modules/cabinet/navigation_panel'

import rates from '@/store/modules/cabinet/rates'
import stats from '@/store/modules/cabinet/stats'
import appeals from '@/store/modules/cabinet/appeals'
import parsers from '@/store/modules/cabinet/parsers'
import favorites from '@/store/modules/cabinet/favorites'

import messenger from '@/store/modules/cabinet/messenger'
import notifications from '@/store/modules/cabinet/notifications'

//* cabinet | admin data
import users from '@/store/modules/cabinet/admin/users'

export default createStore({
	state: () => ({
		document_width: null,
		baseURL: 'http://0.0.0.0:8003',
	}),

	getters: { BASEURL_WITHOUT_PROTOCOL(state) { return state.baseURL.split("/")[2] } },

	mutations: {
		SET_DOCUMENT_WIDTH: (state, payload) => state.document_width = payload,
	},

	actions: {
		getDocumentWidth: async (context) => {
			await context.commit('SET_DOCUMENT_WIDTH', document.documentElement.clientWidth);
			await window.addEventListener("resize", () => {
				setTimeout(() => {
					context.commit('SET_DOCUMENT_WIDTH', document.documentElement.clientWidth);
				}, 100);
			});
		},
	},

	modules: {
		brief,

		cabinet,
		navigation_panel,

		rates,
		stats,
		appeals,
		parsers,
		favorites,
		messenger,
		notifications,

		users,
	}
})
