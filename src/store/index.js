import { createStore } from 'vuex'

export default createStore({
	state: {
		document_width: null,
	},
	getters: {
		DOCUMENT_WIDTH: state => {
			return state.document_width;
		},
	},
	mutations: {
		SET_DOCUMENT_WIDTH(state, payload) {
			state.document_width = payload;
		},
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
	modules: {}
})
