import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	user_auth: null,

	token: cookie.get("auth_token") || null,

	user: {},

	parsers: [],
	parsers_count: null,
})

const getters = {}

const mutations = {
	SET_USER_AUTH: (state, payload) => state.user_auth = payload,

	SET_PARSERS: (state, payload) => state.parsers = payload,
	SET_PARSERS_COUNT: (state, payload) => state.parsers_count = payload,

	SELECT_ALL_PARSERS: (state) => {
		state.parsers.forEach(parser => parser.selected = true);
	},

	UNSELECT_ALL_PARSERS: (state) => {
		state.parsers.forEach(parser => parser.selected = false);
	},


	SELECT_PARSER: (state, payload) => {
		state.parsers.forEach(parser => {
			if (parser.id === payload) { parser.selected = true }
		})
	},
	UNSELECT_PARSER: (state, payload) => {
		state.parsers.forEach(parser => {
			if (parser.id === payload) { parser.selected = false }
		})
	},

	DELETE_SELECTED_PARSERS: (state) => {
		for (let index = 0; index < state.parsers.length; index++) {
			if (state.parsers[index].selected === true) {
				state.parsers.splice(index, 1);
				index--;
			}
		}
	},

	SET_USER_DATA: (state, payload) => state.user = payload,
}

const actions = {
	getUserData: async context => {
		try {
			const request = await axios
				.get(`${store.state.baseURL}/auth/users/me`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (request.status === 200) {
				console.log("User is authorized");
				context.commit('SET_USER_DATA', request.data);
				context.commit('SET_USER_AUTH', true);
				console.log("User data is saved");
			}

		}
		catch {
			console.log("User isn't authorized");
			localStorage.setItem("userAuth", 'no');
			context.commit('SET_USER_AUTH', false);
			cookie.remove("auth_token");
		}
	},

	getParsers: async (context, page_number) => {
		try {
			const request = await axios.get(`${store.state.baseURL}/parser/?page=${page_number}&page_size=10`, {
				headers: { Authorization: `token ${cookie.get('auth_token')}` }
			});

			if (request.status === 200) {
				context.commit('SET_PARSERS', request.data.results);
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
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}