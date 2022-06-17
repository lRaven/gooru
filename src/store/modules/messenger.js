import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	chat_messages: [],
	manager: {},
})

const getters = {}

const mutations = {
	SET_CHAT_MESSAGES: (state, payload) => state.chat_messages = payload,
	SET_MANAGER: (state, payload) => state.manager = payload,
}

const actions = {
	getChatMessages: async (context, ticket_id) => {
		try {
			const request = await axios
				.get(`${store.state.baseURL}/supportchat/?ticket__id=${ticket_id}`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (request.status === 200) {
				context.commit('SET_CHAT_MESSAGES', request.data);
				console.log('Messages saved');
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

	getManager: async (context, manager_id) => {
		try {
			const request = await axios
				.get(`${store.state.baseURL}/auth/users/${manager_id}`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (request.status === 200) {
				context.commit('SET_MANAGER', request.data);
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