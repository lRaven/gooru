import cookie from 'vue-cookies'
import axios from 'axios'
import store from '@/store'
import { multiaction_delete } from '@/api/multiaction_delete'

const state = () => ({
	users: [],
	users_pagination: {},

	users_managers: [],
})

const getters = {}

const mutations = {
	SET_USERS: (state, payload) => state.users = payload,
	SET_USERS_PAGINATION: (state, payload) => state.users_pagination = payload,

	SELECT_ALL_USERS: state => {
		state.users.forEach(user => user.selected = true);
	},

	UNSELECT_ALL_USERS: state => {
		state.users.forEach(user => user.selected = false);
	},


	SELECT_USER: (state, payload) => {
		state.users.forEach(user => {
			if (user.id === payload) { user.selected = true }
		})
	},
	UNSELECT_USER: (state, payload) => {
		state.users.forEach(user => {
			if (user.id === payload) { user.selected = false }
		})
	},

	SET_USERS_MANAGERS: (state, payload) => state.users_managers = payload,
}

const actions = {
	getUsers: async (context, args) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/user/?page=${args.page_number}&page_size=${args.page_size}`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_USERS', response.data.results);
				console.log('Users list saved');

				let pagination_info = {};

				for (const iterator in response.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = response.data[iterator]
					}
				}
				context.commit('SET_USERS_PAGINATION', pagination_info);
			}

		}
		catch (err) { throw new Error(err) }
	},

	deleteSelectedUsers: async () => {
		const users = store.state.users.users;
		const ids = users.reduce((acc, current) => {
			if (current.selected === true) { acc.push(current['id']); }
			return acc;
		}, []);

		if (ids.length > 0) {
			const response = await multiaction_delete('user', ids);
			return response;
		}
	},

	getUsersManagers: async (context) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/usermanager/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_USERS_MANAGERS', response.data.results);
				console.log('Users managers saved');
			}
		}
		catch (err) { throw new Error(err) }
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}