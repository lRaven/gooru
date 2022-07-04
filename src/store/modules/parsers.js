import cookie from 'vue-cookies'
import axios from 'axios'
import store from '@/store'
import { multiaction_delete } from '@/api/multiaction_delete'
import { getComments } from '@/api/parserApi';

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
			const request = await axios.get(`${store.state.baseURL}/parsource/?page=${args.page_number}&page_size=${args.page_size}`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_PARSOURCES', request.data.results);
				let pagination_info = {};

				for (const iterator in request.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = request.data[iterator]
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
			const request = await axios.get(`${store.state.baseURL}/parsource/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_ALL_PARSOURCES', request.data.results);
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
			const request = await axios.get(`${store.state.baseURL}/parsource/${parsource_id}`, {
				headers: { Authorization: `token ${cookie.get('auth_token')}` }
			})

			if (request.status === 200) {
				context.commit('SET_PARSOURCE', request.data);
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
			const request =
				await axios.get(`${store.state.baseURL}/parser/?parsource__name=${args.parsource_name}&page=${args.page_number}&page_size=${args.page_size}`,
					{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });
			if (request.status === 200) {
				console.log(request.data.results)
				
				const comments = await getComments();
				console.log(comments)
				const parsersList = request.data.results.map( parser => {
					const matchedComment = comments.find( commentItem => commentItem.parser === parser.id );
					if (matchedComment) {
						return {...parser, comment: matchedComment.comment};
					} else {
						return {...parser, comment: '' };
					}
				})
				context.commit('SET_PARSERS', parsersList);

				let pagination_info = {};

				for (const iterator in request.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = request.data[iterator]
					}
				}
				context.commit('SET_PARSERS_PAGINATION', pagination_info);

				console.log('Parser list saved');
			}
		}
		catch (err) {
			console.log(err)
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
			const request =
				await axios.get(`${store.state.baseURL}/parser/?page_size=999`,
					{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });

			if (request.status === 200) {
				context.commit('SET_ALL_PARSERS', request.data.results);
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

	deleteSelectedParsources: () => {
		const parsources = store.state.parsers.parsources;
		const ids = parsources.reduce((acc, current) => {
			if (current.selected === true) { acc.push(current['id']); }
			return acc;
		}, []);

		if (ids.length > 0) {
			multiaction_delete({
				model: 'parsource',
				ids: ids,
				model_update: {
					name: "getParsources",
					data: { page_number: 1, page_size: 10, }
				}
			});
		}
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}