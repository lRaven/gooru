import cookie from 'vue-cookies'
import axios from 'axios'
import store from '@/store'
import { multiaction_delete } from '@/api/multiaction_delete'

const state = () => ({
	parsources: [],
	parsources_pagination: {},
	all_parsources: [],
	parsource: {},

	parsers: [],
	parsers_pagination: {},
	all_parsers: [],
})

const getters = {}

const mutations = {
	SET_PARSOURCES: (state, payload) => state.parsources = payload,
	SET_PARSOURCES_PAGINATION: (state, payload) => state.parsources_pagination = payload,
	SET_ALL_PARSOURCES: (state, payload) => state.all_parsources = payload,
	SET_PARSOURCE: (state, payload) => state.parsource = payload,


	SELECT_ALL_PARSOURCES: state => {
		state.parsources.forEach(parsource => parsource.selected = true);
	},

	UNSELECT_ALL_PARSOURCES: state => {
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

	SET_PARSERS: (state, payload) => state.parsers = payload,
	SET_PARSERS_PAGINATION: (state, payload) => state.parsers_pagination = payload,
	SET_ALL_PARSERS: (state, payload) => state.all_parsers = payload,
}

const actions = {
	//*get parsources with pagination
	getParsources: async (context, args) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/parsource/?page=${args.page_number}&page_size=${args.page_size}`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_PARSOURCES', response.data.results);

				let pagination_info = {};

				for (const iterator in response.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = response.data[iterator]
					}
				}
				context.commit('SET_PARSOURCES_PAGINATION', pagination_info);

				console.log('Parsource list saved');
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

	getAllParsources: async context => {
		try {
			const response = await axios.get(`${store.state.baseURL}/parsource/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_ALL_PARSOURCES', response.data.results);
				console.log('Full parsource list saved');
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
			const response = await axios.get(`${store.state.baseURL}/parsource/${parsource_id}`, {
				headers: { Authorization: `token ${cookie.get('auth_token')}` }
			})

			if (response.status === 200) {
				context.commit('SET_PARSOURCE', response.data);
				console.log('Parsource saved');
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

	//* get parsers with pagination
	getParsers: async (context, args) => {
		try {
			const response =
				await axios.get(`${store.state.baseURL}/parser/?parsource__name=${args.parsource_name}&page=${args.page_number}&page_size=${args.page_size}`,
					{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });

			if (response.status === 200) {
				context.commit('SET_PARSERS', response.data.results);

				let pagination_info = {};

				for (const iterator in response.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = response.data[iterator]
					}
				}
				context.commit('SET_PARSERS_PAGINATION', pagination_info);

				console.log('Parser list saved');
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
	getAllParsers: async context => {
		try {
			const response =
				await axios.get(`${store.state.baseURL}/parser/?page_size=999`,
					{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });

			if (response.status === 200) {
				context.commit('SET_ALL_PARSERS', response.data.results);
				console.log('Full parser list saved');
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

	deleteSelectedParsources: async () => {
		const parsources = store.state.parsers.parsources;
		const ids = parsources.reduce((acc, current) => {
			if (current.selected === true) { acc.push(current['id']); }
			return acc;
		}, []);

		if (ids.length > 0) {
			const response = await multiaction_delete('parsource', ids);
			return response;
		}
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}