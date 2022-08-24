import { getTabs } from "@/api/blog";

const state = () => ({ tab: "appeals", blogTabs: [{ id: 0, tab: "Все" , selected: false,
icon_fill: ""}] });

const getters = {};

const mutations = {
	SET_TAB: (state, payload) => (state.tab = payload),
	SET_BLOG_TABS: (state, payload) => (state.blogTabs = payload),
};

const actions = {
	getBlogNavigation: async (context) => {
		try {
			const topics = await getTabs();
			context.commit("SET_BLOG_TABS", topics);
		} catch (error) {
			console.log(error);
			throw { ...error };
		}
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
