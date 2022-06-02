import { createStore } from 'vuex'

import rates from '@/store/modules/rates'
import brief from '@/store/modules/brief'
import navigation_panel from '@/store/modules/navigation_panel'
import cabinet from '@/store/modules/cabinet'

export default createStore({
	state: () => ({
		document_width: null,
		baseURL: 'http://0.0.0.0:8003',
	}),

	getters: {},

	mutations: { SET_DOCUMENT_WIDTH: (state, payload) => state.document_width = payload },

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
	}
})
