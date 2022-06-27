import cookie from 'vue-cookies'
import axios from 'axios'
import store from '@/store'

const state = () => ({ users_managers: [], })

const getters = {}

const mutations = {
	SET_USERS_MANAGERS: (state, payload) => state.users_managers = payload,
}

const actions = {
	getUsersManagers: async (context) => {
		try {
			const request = await axios.get(`${store.state.baseURL}/usermanager/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_USERS_MANAGERS', request.data.results);
				console.log('Users managers saved');
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