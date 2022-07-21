import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

import { createFavoriteParser, deleteFavoriteParser } from '@/api/parser';

const state = () => ({ favorites: [], })

const getters = {}

const mutations = {
	SET_FAVORITES: (state, payload) => state.favorites = payload,
	CLEAR_FAVORITES: (state) => state.favorites = [],

	CLEAR_FAVORITES_STATE: (state) => state.favorites = [],
}

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
	updateFavorites: async (context, { parserToUpdate, userId, isFavorite }) => {
		try {
			
			if (isFavorite) {
				await deleteFavoriteParser({ id: parserToUpdate.id });
				const updatedFavorites = context.state.favorites.map( favoriteParsource => {
					if (favoriteParsource.id === parserToUpdate.parsource) {
						favoriteParsource.parsers = favoriteParsource.parsers.filter( favoriteParser => favoriteParser.id !== parserToUpdate.id);
					}
					return favoriteParsource;
				});
				context.commit('SET_FAVORITES', updatedFavorites);
			} else {
				await createFavoriteParser({ parser: parserToUpdate.id, user: userId });
				const favoriteParsourcesCopy = context.state.favorites.map( parsource => {
					return JSON.parse(JSON.stringify(parsource));
				});
				
				const updatedFavoriteParsource = favoriteParsourcesCopy.find( favoriteParsource => favoriteParsource.id === parserToUpdate.parsource);
				if (updatedFavoriteParsource) {
					const newFavoriteParser = {};
					Object.keys(parserToUpdate).forEach( key => {
						if (key !== 'comment') {
							newFavoriteParser[key] = parserToUpdate[key];
						}
					});
					updatedFavoriteParsource.parsers.push(newFavoriteParser);
					context.commit('SET_FAVORITES', favoriteParsourcesCopy);
				} else {
					const parsourcesCopy = context.rootState.parsers.all_parsources.map( parsource => {
						return JSON.parse(JSON.stringify(parsource));
					});
					const newFavoriteParsource = parsourcesCopy.find(parsource => parsource.id === parserToUpdate.parsource);
					newFavoriteParsource.parsers = [parserToUpdate];
					context.commit('SET_FAVORITES', [...context.state.favorites, newFavoriteParsource]);
				}
				
				/* if (isParsourceInFavotites) {
					const updatedParsource = {...isParsourceInFavotites};
					const newFavoriteParser = {};
						Object.keys(parserToUpdate).forEach( key => {
							if (key !== 'comment') {
								newFavoriteParser[key] = parserToUpdate[key];
							}
						});
						updatedParsource.parsers.push(newFavoriteParser);
						const updatedFavorites = context.state.favorites.map( favoriteParsource => {

						} )
				} else {
					
				}
				const updatedFavorites = context.state.favorites.map( favoriteParsource => {
					if (favoriteParsource.id === parserToUpdate.parsource) {
						const newFavoriteParser = {};
						Object.keys(parserToUpdate).forEach( key => {
							if (key !== 'comment') {
								newFavoriteParser[key] = parserToUpdate[key];
							}
						});
						favoriteParsource.parsers.push(newFavoriteParser)
					}
					return favoriteParsource;
				});
				context.commit('SET_FAVORITES', updatedFavorites); */
			}
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}