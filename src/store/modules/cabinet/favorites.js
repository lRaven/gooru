import {
	getUserFavoriteParsers,
	/* createFavoriteParser,
	deleteFavoriteParser, */
	getComments,
} from "@/api/parser";

const state = () => ({ favorites: [] });

const getters = {
	/* favoriteParsers: (state) => (parsourceId) => {
		const desiredParsource = state.favorites.find(
			(favoriteParsource) => favoriteParsource.id === parsourceId
		);
		if (desiredParsource) {
			return desiredParsource.parsers;
		}
		return [];
	}, */
};

const mutations = {
	SET_FAVORITES: (state, payload) => (state.favorites = payload),
	
	CLEAR_FAVORITES: (state) => (state.favorites = []),

	CLEAR_FAVORITES_STATE: (state) => state.favorites = [],
};

const actions = {
	getFavoriteParsers: async (context) => {
		try {
			const favoriteItems = await getUserFavoriteParsers();
			const comments = await getComments();
			console.log(comments)
			const favoriteParsers = favoriteItems.map( ({ parser, id }) => {
				const comment = comments.find( comment => comment.parser === parser.id);
				if (comment) {
					return { ...parser, favoriteId: id, comment: { text: comment.comment, id: comment.id } };
				}
				return { ...parser, favoriteId: id, comment: { text: '', id: null} };
			});
			context.commit('SET_FAVORITES', favoriteParsers);
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
			let favoriteParsources = [];
			parsers.forEach((favoriteParser) => {
				const matchedParsource = allParsourcesCopy.find(
					(parsource) => parsource.id === favoriteParser.parsource
				);
				const duplicatedParsource = favoriteParsources.find(
					(parsource) => parsource.id === matchedParsource.id
				);

				if (!duplicatedParsource) {
					if (matchedParsource !== undefined) {
						favoriteParsources.push(matchedParsource);
					}
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
	/* updateFavorites: async (
		context,
		{ parserToUpdate, userId, isFavorite }
	) => {
		try {
			if (isFavorite) {
				await deleteFavoriteParser({ id: parserToUpdate.favoriteId });
				const favoritesCopy = JSON.parse(
					JSON.stringify(context.state.favorites)
				);

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
				const favoriteParsourcesCopy = JSON.parse(JSON.stringify(context.state.favorites));
				const updatedFavoriteParsource = favoriteParsourcesCopy.find(
					(favoriteParsource) =>
						favoriteParsource.id === parserToUpdate.parsource
				);
				if (updatedFavoriteParsource) {
					updatedFavoriteParsource.parsers.push({
						...parserToUpdate,
						favoriteId: newFavoriteParserIds.id,
					});
					context.commit("SET_FAVORITES", favoriteParsourcesCopy);
				} else {
					const parsourcesCopy = JSON.parse(
						JSON.stringify(context.rootState.parsers.all_parsources)
					);
					const newFavoriteParsource = parsourcesCopy.find(
						(parsource) => parsource.id === parserToUpdate.parsource
					);
					newFavoriteParsource.parsers = [{ ...parserToUpdate, favoriteId: newFavoriteParserIds.id }];
					context.commit("SET_FAVORITES", [
						...context.state.favorites,
						newFavoriteParsource,
					]);
				}
			}
		} catch (error) {
			throw new Error(error);
		}
	}, */
};

export default {
	state,
	getters,
	mutations,
	actions,
};
