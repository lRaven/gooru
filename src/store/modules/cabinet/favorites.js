// import store from "@/store";

import {
	//getUserParsources,
	getUserFavoriteParsers,
	createFavoriteParser,
	deleteFavoriteParser,
} from "@/api/parser";

const state = () => ({ favorites: [] });

const getters = {};

const mutations = {
	SET_FAVORITES: (state, payload) => (state.favorites = payload),
	CLEAR_FAVORITES: (state) => (state.favorites = []),

	CLEAR_FAVORITES_STATE: (state) => (state.favorites = []),
};

const actions = {
	getFavoriteParsers: async (context) => {
		try {
			/* в этом запросе нам приходит массив объектов вида
			{
				"id": 1,
				"user": 3,
				"parser": 1
			} 
			id - идентификатор записи в таблице избранного
			*/
			const favoriteParserIds = await getUserFavoriteParsers();
			// ниже мы будем проходить по массиву парсеров и находить там объекты
			// по совпадающим id, чтобы сформировать
			//  новый массив избранных парсеров, но уже с данными
			if (!context.rootState.parsers.all_parsers.length) {
				await context.dispatch("getAllParsers", null, { root: true });
			}
			const parsersCopy = JSON.parse(
				JSON.stringify(context.rootState.parsers.all_parsers)
			);

			const favoriteParsers = favoriteParserIds.map((parserIdData) => {
				const favoriteParser = parsersCopy.find(
					(parser) => parser.id === parserIdData.parser
				);
				if (favoriteParser) {
					const parserDataWithoutComment = { favoriteId: parserIdData.id };
					Object.keys(favoriteParser).forEach((key) => {
						if (key !== "comment") {
							parserDataWithoutComment[key] = favoriteParser[key];
						}
					});
					return parserDataWithoutComment;
				}
			});
			context.dispatch("getFavoriteParsources", favoriteParsers);
		} catch (err) {
			throw new Error(err);
		}
	},

	getFavoriteParsources: async (context, parsers) => {
		try {
			if (!context.rootState.parsers.all_parsources.length) {
				await context.dispatch("getAllParsources", null, {
					root: true,
				});
			}
			const allParsourcesCopy = JSON.parse(JSON.stringify(context.rootState.parsers.all_parsources));
			const favoriteParsources = [];
			parsers.forEach((favoriteParser) => {
				const matchedParsource = allParsourcesCopy.find(
					(parsource) => parsource.id === favoriteParser.parsource
				);
				const duplicatedParsource = favoriteParsources.find(
					(parsource) => parsource.id === matchedParsource.id
				);
				if (!duplicatedParsource) {
					favoriteParsources.push(matchedParsource);
				}
			});
			favoriteParsources.forEach((parsource) => {
				parsource.parsers = [];

				parsers.forEach((parser) => {
					if (parsource.id === parser.parsource) {
						parsource.parsers.push(parser);
					}
				});
			});
				context.commit("SET_FAVORITES", favoriteParsources);
				console.log("Favorite parsources saved");
		} catch (err) {
			throw new Error(err);
		}
	},
	updateFavorites: async (
		context,
		{ parserToUpdate, userId, isFavorite }
	) => {
		try {
			if (isFavorite) {
				await deleteFavoriteParser({ id: parserToUpdate.favoriteId });
				const favoritesCopy = JSON.parse(JSON.stringify(context.state.favorites));

				const updatedFavorites = favoritesCopy.filter(
					(favoriteParsource) => {
						if (favoriteParsource.id === parserToUpdate.parsource) {
							favoriteParsource.parsers =
								favoriteParsource.parsers.filter(
									(favoriteParser) =>
										favoriteParser.id !== parserToUpdate.id
								);
						}
						return favoriteParsource.parsers.length !== 0;
					}
				);
				context.commit("SET_FAVORITES", updatedFavorites);
			} else {
				const newFavoriteParserIds = await createFavoriteParser({
					parser: parserToUpdate.id,
					user: userId,
				});
				const favoriteParsourcesCopy =  JSON.parse(JSON.stringify(context.state.favorites));
				const updatedFavoriteParsource = favoriteParsourcesCopy.find(
					(favoriteParsource) =>
						favoriteParsource.id === parserToUpdate.parsource
				);
				if (updatedFavoriteParsource) {
					const newFavoriteParser = { favoriteId: newFavoriteParserIds.id };
					Object.keys(parserToUpdate).forEach((key) => {
						if (key !== "comment") {
							newFavoriteParser[key] = parserToUpdate[key];
						}
					});
					updatedFavoriteParsource.parsers.push(newFavoriteParser);
					context.commit("SET_FAVORITES", favoriteParsourcesCopy);
				} else {
					const parsourcesCopy = JSON.parse(JSON.stringify(context.rootState.parsers.all_parsources));
					const newFavoriteParsource = parsourcesCopy.find(
						(parsource) => parsource.id === parserToUpdate.parsource
					);
					newFavoriteParsource.parsers = [{...parserToUpdate, favoriteId: newFavoriteParserIds.id }];
					context.commit("SET_FAVORITES", [
						...context.state.favorites,
						newFavoriteParsource,
					]);
				}
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
