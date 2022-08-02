import cookie from "vue-cookies";
import axios from "axios";
import store from "@/store";

const state = () => ({ notifications: [], });

const getters = {
	//* TODO: после получения подробной инфы уведомлений - поправить
	appeals_notifications(state) {
		return state.notifications.filter((notification) =>
			notification.url.toLowerCase().includes('support')
		) || [];
	},
	parsources_notifications(state) {
		return state.notifications.filter((notification) =>
			notification.url.toLowerCase().includes('parsource')
		) || [];
	},
	parsers_notifications(state) {
		return state.notifications.filter((notification) =>
			notification.url.toLowerCase().includes('parser')
		) || [];
	}
};

const mutations = { SET_NOTIFICATIONS: (state, payload) => (state.notifications = payload), };

const actions = {
	getNotifications: async (context) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/notify/`,
				{ headers: { Authorization: `token ${cookie.get("auth_token")}`, } }
			);

			if (response.status === 200) {
				context.commit('SET_NOTIFICATIONS', response.data.results);
				console.log('Notifications saved');
			}
		} catch (err) { throw new Error(err); }
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
