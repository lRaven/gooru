import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	chat_messages: [],
	all_messages: [],
})

const getters = {}

const mutations = {
	SET_CHAT_MESSAGES: (state, payload) => state.chat_messages = payload,
	SET_ALL_MESSAGES: (state, payload) => state.all_messages = payload,
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

	getAllMessages: async (context) => {
		try {
			const request = await axios
				.get(`${store.state.baseURL}/supportchat/`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (request.status === 200) {
				context.commit('SET_ALL_MESSAGES', request.data);
				console.log('All messages saved');
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