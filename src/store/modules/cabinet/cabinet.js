import cookie from "vue-cookies";
import axios from "axios";
import store from "@/store";

import { getRates } from "@/api/userApi";

const state = () => ({
  user_auth: null,

  token: cookie.get("auth_token") || null,

  user: {},

  rate: null,
});

const getters = {};

const mutations = {
  SET_USER_AUTH: (state, payload) => (state.user_auth = payload),

  SET_USER_DATA: (state, payload) => (state.user = payload),

  SET_USER_RATE_DATA: (state, payload) => (state.rate = payload),
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
      }
    } catch {
      console.log("User isn't authorized");
      localStorage.setItem("userAuth", "no");
      context.commit("SET_USER_AUTH", false);
      cookie.remove("auth_token");
    }
  },

  getUserRate: async (context) => {
    try {
      const userRateList = await getRates();
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
        });
		
      } else {
        context.commit("SET_USER_RATE_DATA", {});
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
