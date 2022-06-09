import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	parsources: [],
	parsources_pagination: {},
	parsource: {},

	parsers: [],
	parsers_pagination: {},
})

const getters = {}

const mutations = {
	SET_PARSOURCES: (state, payload) => state.parsources = payload,
	SET_PARSOURCES_PAGINATION: (state, payload) => state.parsources_pagination = payload,
	SET_PARSOURCE: (state, payload) => state.parsource = payload,


	SELECT_ALL_PARSOURCES: (state) => {
		state.parsources.forEach(parsource => parsource.selected = true);
	},

	UNSELECT_ALL_PARSOURCES: (state) => {
		state.parsources.forEach(parsource => parsource.selected = false);
	},

	SELECT_PARSOURCE: (state, payload) => {
		state.parsources.forEach(parsource => {
			if (parsource.id === payload) { parsource.selected = true }
		})
	},
	UNSELECT_PARSOURCE: (state, payload) => {
		state.parsources.forEach(parsource => {
			if (parsource.id === payload) { parsource.selected = false }
		})
	},

	DELETE_SELECTED_PARSOURCES: (state) => {
		for (let index = 0; index < state.parsources.length; index++) {
			if (state.parsources[index].selected === true) {
				state.parsources.splice(index, 1);
				index--;
			}
		}
	},

	SET_PARSERS: (state, payload) => state.parsers = payload,
	SET_PARSERS_PAGINATION: (state, payload) => state.parsers_pagination = payload,
}

const actions = {
	getParsources: async context => {
		try {
			const request = await axios.get(`${store.state.baseURL}/parsource/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_PARSOURCES', request.data.results);

				let pagination_info = {};

				for (const iterator in request.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = request.data[iterator]
					}
				}
				console.log(pagination_info);
				context.commit('SET_PARSOURCES_PAGINATION', pagination_info);
			}

		}
		catch (err) {
			console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
			);
		}
	},

	getParsource: async (context, parsource_id) => {
		try {
			const request = await axios.get(`${store.state.baseURL}/parsource/${parsource_id}`, {
				headers: { Authorization: `token ${cookie.get('auth_token')}` }
			})

			if (request.status === 200) context.commit('SET_PARSOURCE', request.data);
		}
		catch (err) {
			console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
			);
		}
	},

	getParsers: async (context, args) => {
		try {
			const request =
				await axios.get(`${store.state.baseURL}/parser/?page=${args.page_number}&page_size=${args.page_size}`,
					{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });

			if (request.status === 200) {
				context.commit('SET_PARSERS', request.data.results);

				let pagination_info = {};

				for (const iterator in request.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = request.data[iterator]
					}
				}
				context.commit('SET_PARSERS_PAGINATION', pagination_info);
			}
		}
		catch (err) {
			console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
			);
		}
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}