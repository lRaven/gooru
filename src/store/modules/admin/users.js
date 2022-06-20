import cookie from 'vue-cookies'
import axios from 'axios'
import store from '@/store'

const state = () => ({
	users: [],
	users_pagination: {},
})

const getters = {}

const mutations = {
	SET_USERS: (state, payload) => state.users = payload,
	SET_USERS_PAGINATION: (state, payload) => state.users_pagination = payload,
}

const actions = {
	getUsers: async (context, args) => {
		try {
			const request = await axios.get(`${store.state.baseURL}/user/?page=${args.page_number}&page_size=${args.page_size}`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_USERS', request.data.results);

				let pagination_info = {};

				for (const iterator in request.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = request.data[iterator]
					}
				}
				context.commit('SET_USERS_PAGINATION', pagination_info);
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