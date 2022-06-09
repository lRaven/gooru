import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	user_auth: null,

	token: cookie.get("auth_token") || null,

	user: {},
})

const getters = {}

const mutations = {
	SET_USER_AUTH: (state, payload) => state.user_auth = payload,

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
}

export default {
	state,
	getters,
	mutations,
	actions,
}