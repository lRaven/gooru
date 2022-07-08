import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({ favorites: [], })

const getters = {}

const mutations = { SET_FAVORITES: (state, payload) => state.favorites = payload, }

const actions = {
	getFavoriteParsers: async context => {
		try {
			const response = await axios
				.get(`${store.state.baseURL}/myfavorites`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (response.status === 200) {
				context.dispatch('getFavoriteParsources', response.data);
				console.log('Favorite parsers saved');
			}

		}
		catch (err) { throw new Error(err) }
	},

	getFavoriteParsources: async (context, parsers) => {
		try {
			const response = await axios
				.get(`${store.state.baseURL}/parsource/`, {
					headers: { Authorization: `token ${cookie.get("auth_token")}`, },
				})

			if (response.status === 200) {
				let favorites = [];

				//* сборка parsource в которых есть парсеры в избранном
				parsers.forEach(parser => {
					const matchedParsource = response.data.results.find(parsource => parsource.id === parser.parsource);
					const duplicatedItem = favorites.find(parsource => parsource.id === matchedParsource.id);
					if (!duplicatedItem && matchedParsource !== undefined) {
						favorites.push(matchedParsource);
					}
				})

				//* сборка parsers в их parsources по id
				favorites.forEach(parsource => {
					parsource.parsers = [];

					parsers.forEach(parser => {
						if (parsource.id === parser.parsource) {
							parsource.parsers.push(parser);
						}
					})
				})

				context.commit('SET_FAVORITES', favorites);
				console.log('Favorite parsources saved');
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