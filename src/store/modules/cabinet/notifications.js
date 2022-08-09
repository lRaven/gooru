import cookie from "vue-cookies";
import axios from "axios";
import store from "@/store";

const state = () => ({ notifications: [], });

const getters = {
	//* TODO: после получения подробной инфы уведомлений - поправить
	appeals_notifications(state) {
		return state.notifications.filter((notification) =>
			notification.category === 'SupportTicket'
		) || [];
	},
	parsources_notifications(state) {
		return state.notifications.filter((notification) =>
			notification.category === 'Parsource'
		) || [];
	},
	parsers_notifications(state) {
		return state.notifications.filter((notification) =>
			notification.category === 'Parser'
		) || [];
	},
	user_notifications(state) {
		const notificationsAboutUsers = state.notifications.filter(notification => {
			return notification.category === 'User'
		}) || [];
		if (notificationsAboutUsers) {
			const notificationsMap = new Map();
			notificationsAboutUsers.forEach(notification => {
				const userEmail = notification.message.split(': ');
				notificationsMap.set(userEmail[1], notification);
			});
			return notificationsMap;
		}
		return new Map();
	},
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
