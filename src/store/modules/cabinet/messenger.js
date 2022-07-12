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
	CLEAR_CHAT_MESSAGES: (state) => state.chat_messages = [],

	SET_ALL_MESSAGES: (state, payload) => state.all_messages = payload,
	CLEAR_ALL_MESSAGES: (state) => state.all_messages = [],

	CLEAR_MESSENGER_STATE: (state) => {
		state.chat_messages = [];
		state.all_messages = [];
	}
}

const actions = {
	getChatMessages: async (context, ticket_id) => {
		try {
			const response = await axios
				.get(`${store.state.baseURL}/supportchat/?ticket__id=${ticket_id}`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (response.status === 200) {
				context.commit('SET_CHAT_MESSAGES', response.data);
				console.log('Messages saved');
			}
		}

		catch (err) { throw new Error(err) }
	},

	getAllMessages: async (context) => {
		try {
			const response = await axios
				.get(`${store.state.baseURL}/supportchat/`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (response.status === 200) {
				context.commit('SET_ALL_MESSAGES', response.data);
				console.log('All messages saved');
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