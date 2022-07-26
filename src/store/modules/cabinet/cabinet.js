import cookie from "vue-cookies";
import axios from "axios";
import store from "@/store";

import { getUserRates } from "@/api/userApi";

const state = () => ({
	user_auth: null,

	token: cookie.get("auth_token") || null,

	user: {},

	rate: {},
});

const getters = {};

const mutations = {
	SET_USER_AUTH: (state, payload) => (state.user_auth = payload),

	SET_USER_DATA: (state, payload) => (state.user = payload),
	CLEAR_USER_DATA: (state) => state.user = {},

	SET_USER_RATE_DATA: (state, payload) => (state.rate = payload),
	CLEAR_USER_RATE_DATA: (state) => state.rate = null,
};

const actions = {
	getUserData: async (context) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/auth/users/me`, {
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			});

			if (response.status === 200) {
				console.log("User is authorized");
				context.commit("SET_USER_DATA", response.data);
				context.commit("SET_USER_AUTH", true);
				console.log("User data saved");


				localStorage.setItem('role', response.data.role);
			}
		} catch {
			console.log("User isn't authorized");
			localStorage.clear();
			context.commit("SET_USER_AUTH", false);
			context.dispatch('clearCabinetData');
			cookie.remove("auth_token");
		}
	},

	getUserRate: async (context) => {
		try {
			const userRateList = await getUserRates();
			const userRate = userRateList.find(
				(rateItem) => rateItem.user === context.state.user.id
			);
			if (userRate) {
				const { data: tariffInfo } = await axios.get(
					`${store.state.baseURL}/tariff/${userRate.tariff}`,
					{
						headers: { Authorization: `token ${cookie.get("auth_token")}` },
					}
				);

				context.commit("SET_USER_RATE_DATA", {
					...userRate,
					name: tariffInfo.name,
					amount: tariffInfo.cost,
					loaded: true,
				});

			} else {
				context.commit("SET_USER_RATE_DATA", { loaded: true });
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	clearCabinetData(context) {
		//* очистка profile 
		context.commit('CLEAR_USER_DATA');
		context.commit('CLEAR_USER_RATE_DATA');

		context.commit('CLEAR_APPEALS_STATE');
		context.commit('CLEAR_USERS_STATE');
		context.commit('CLEAR_PARSERS_STATE');
		context.commit('CLEAR_MESSENGER_STATE');
		context.commit('CLEAR_FAVORITES_STATE');
	}
};

export default {
	state,
	getters,
	mutations,
	actions,
};
