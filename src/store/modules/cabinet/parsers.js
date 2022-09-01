import cookie from "vue-cookies";
import axios from "axios";
import store from "@/store";
import { multiaction_delete } from "@/api/multiaction_delete";
import {
	getComments,
	updateParsourceName,
	deleteParser,
	getUserFavoriteParsers,
	createFavoriteParser,
	deleteFavoriteParser,
} from "@/api/parser";

const state = () => ({
	parsources: [],
	parsources_pagination: {},
	all_parsources: [],
	parsource: {},

	parsers: [],
	parsers_pagination: {},
	all_parsers: [],
});

const getters = {
	parsersWithComments: (state) => {
		return (
			state.parsers.filter((parser) => {
				return parser.comment.id !== null;
			}) || []
		);
	},
	favoriteParsers: (state) => {
		return (
			state.parsers.filter((parser) => parser.favoriteId !== null) || []
		);
	},
	favoriteParsources: (state) => {
		const favoriteParsources = state.all_parsources.filter( parsource => {
			const matchedParser = state.all_parsers.find( parser => parser.parsource === parsource.id && parser.favoriteId);
			if (matchedParser) {
				return parsource;
			}
		});
		return favoriteParsources || [];
	},
	sourcesInParsource: (state) => (parsource) => {
		const allParsersInChoosenParsource = state.all_parsers.filter(
			(parser) => parser.parsource === parsource
		);
		const sources = allParsersInChoosenParsource.reduce(
			(prevArray, currentParser) => {
				const sourceUrl = currentParser.url.split("/", 3).join("/");
				const hasInSources = prevArray.find(
					(uniqSource) => uniqSource.url === sourceUrl
				);
				if (!hasInSources) {
					return [
						...prevArray,
						{ url: sourceUrl, id: currentParser.id },
					];
				}
				return prevArray;
			},
			[]
		);
		return sources;
	},
};

const mutations = {
	SET_PARSOURCES: (state, payload) => (state.parsources = payload),
	SET_PARSOURCES_PAGINATION: (state, payload) =>
		(state.parsources_pagination = payload),
	ADD_PARSOURCES: (state, payload) => (state.parsources = payload),
	CLEAR_PARSOURCES: (state) => {
		state.parsources = [];
		state.parsources_pagination = {};
	},

	SET_ALL_PARSOURCES: (state, payload) => (state.all_parsources = payload),
	CLEAR_ALL_PARSOURCES: (state) => (state.all_parsources = []),

	SET_PARSOURCE: (state, payload) => (state.parsource = payload),
	CLEAR_PARSOURCE: (state) => (state.parsource = {}),

	SELECT_ALL_PARSOURCES: (state) => {
		state.parsources.forEach((parsource) => (parsource.selected = true));
	},

	UNSELECT_ALL_PARSOURCES: (state) => {
		state.parsources.forEach((parsource) => (parsource.selected = false));
	},

	SELECT_PARSOURCE: (state, payload) => {
		state.parsources.forEach((parsource) => {
			if (parsource.id === payload) {
				parsource.selected = true;
			}
		});
	},
	UNSELECT_PARSOURCE: (state, payload) => {
		state.parsources.forEach((parsource) => {
			if (parsource.id === payload) {
				parsource.selected = false;
			}
		});
	},

	SET_PARSERS: (state, payload) => (state.parsers = payload),
	SET_UPDATED_PARSERS: (state, payload) => {
		const parsersCopy = JSON.parse(JSON.stringify(state.parsers));
		const updatedParsers = parsersCopy.map((parser) => {
			if (parser.id === payload.id) {
				return payload;
			}
			return parser;
		});
		state.parsers = updatedParsers;
	},
	SET_PARSERS_PAGINATION: (state, payload) =>
		(state.parsers_pagination = payload),
	ADD_PARSERS: (state, payload) => (state.parsers = payload),
	CLEAR_PARSERS: (state) => {
		state.parsers = [];
		state.parsers_pagination = {};
	},

	SET_ALL_PARSERS: (state, payload) => (state.all_parsers = payload),
	SET_UPDATED_ALL_PARSERS: (state, payload) => {
		const parsersCopy = JSON.parse(JSON.stringify(state.all_parsers));
		const updatedParsers = parsersCopy.map((parser) => {
			if (parser.id === payload.id) {
				return payload;
			}
			return parser;
		});
		state.all_parsers = updatedParsers;
	},
	CLEAR_ALL_PARSERS: (state) => (state.all_parsers = []),

	CLEAR_PARSERS_STATE: (state) => {
		state.parsources = [];
		state.parsources_pagination = {};
		state.all_parsources = [];
		state.parsource = {};
		state.parsers = [];
		state.parsers_pagination = {};
		state.all_parsers = [];
	},
};

const actions = {
	//*get parsources with pagination
	getParsources: async (context, args) => {
		try {
			const response = await axios.get(
				`${store.state.baseURL}/parsource/?page=${args.page_number}&page_size=${args.page_size}`,
				{
					headers: {
						Authorization: `token ${cookie.get("auth_token")}`,
					},
				}
			);

			if (!args.nextPage) {
				if (response.status === 200) {
					context.commit("SET_PARSOURCES", response.data.results);

					let pagination_info = {};

					for (const iterator in response.data) {
						if (iterator !== "results") {
							pagination_info[iterator] = response.data[iterator];
						}
					}
					context.commit(
						"SET_PARSOURCES_PAGINATION",
						pagination_info
					);

					console.log("Parsource list saved");
				}
			}

			return response;
		} catch (err) {
			throw new Error(err);
		}
	},

	getAllParsources: async (context) => {
		try {
			const response = await axios.get(
				`${store.state.baseURL}/parsource/`,
				{
					headers: {
						Authorization: `token ${cookie.get("auth_token")}`,
					},
				}
			);
			if (response.status === 200) {
				context.commit("SET_ALL_PARSOURCES", response.data.results);
				console.log("Full parsource list saved");
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	getParsource: async (context, parsource_id) => {
		try {
			const response = await axios.get(
				`${store.state.baseURL}/parsource/${parsource_id}`,
				{
					headers: {
						Authorization: `token ${cookie.get("auth_token")}`,
					},
				}
			);

			if (response.status === 200) {
				context.commit("SET_PARSOURCE", response.data);
				console.log("Parsource saved");
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	updateParsourceName: async (context, payload) => {
		try {
			const updatedName = await updateParsourceName({
				id: payload.id,
				name: payload.editedName,
			});

			const updatedParsources = context.state.parsources.map(
				(parsource) => {
					if (parsource.id === payload.id) {
						parsource.name = updatedName;
					}
					return parsource;
				}
			);
			context.commit("SET_PARSOURCES", updatedParsources);
		} catch (error) {
			throw new Error(error);
		}
	},

	//* get parsers with pagination
	getParsers: async (context, args) => {
		try {
			const response = await axios.get(
				`${store.state.baseURL}/parser/?${
					args.search ? `search=${args.search}&` : ""
				}parsource__name=${args.parsource_name}&page=${
					args.page_number
				}&page_size=${args.page_size}`,
				{
					headers: {
						Authorization: `token ${cookie.get("auth_token")}`,
					},
				}
			);
			if (args.nextPage) {
				const comments = await getComments();
				const favoriteItems = await getUserFavoriteParsers();
				const parsersList = response.data.results.map((parser) => {
					const isFavoriteItem = favoriteItems.find(
						(item) => item.parser.id === parser.id
					);
					const matchedComment = comments.find(
						(commentItem) => commentItem.parser === parser.id
					);
					if (matchedComment) {
						return {
							...parser,
							favoriteId: isFavoriteItem
								? isFavoriteItem.id
								: null,
							comment: {
								text: matchedComment.comment,
								id: matchedComment.id,
							},
						};
					} else {
						return {
							...parser,
							comment: { text: "", id: null },
							favoriteId: isFavoriteItem
								? isFavoriteItem.id
								: null,
						};
					}
				});
				return parsersList;
			}
			if (response.status === 200) {
				const comments = await getComments();
				const favoriteItems = await getUserFavoriteParsers();
				const parsersList = response.data.results.map((parser) => {
					const isFavoriteItem = favoriteItems.find(
						(item) => item.parser.id === parser.id
					);
					const matchedComment = comments.find(
						(commentItem) => commentItem.parser === parser.id
					);
					if (matchedComment) {
						return {
							...parser,
							favoriteId: isFavoriteItem
								? isFavoriteItem.id
								: null,
							comment: {
								text: matchedComment.comment,
								id: matchedComment.id,
							},
						};
					} else {
						return {
							...parser,
							comment: { text: "", id: null },
							favoriteId: isFavoriteItem
								? isFavoriteItem.id
								: null,
						};
					}
				});
				parsersList.reverse();
				context.commit("SET_PARSERS", parsersList);

				let pagination_info = {};

				for (const iterator in response.data) {
					if (iterator !== "results") {
						pagination_info[iterator] = response.data[iterator];
					}
				}
				context.commit("SET_PARSERS_PAGINATION", pagination_info);

				console.log("Parser list saved");
			}

			return response;
		} catch (err) {
			throw new Error(err);
		}
	},
	getAllParsers: async (context) => {
		try {
			const response = await axios.get(
				`${store.state.baseURL}/parser/?page_size=${1e6}`,
				{
					headers: {
						Authorization: `token ${cookie.get("auth_token")}`,
					},
				}
			);
			if (response.status === 200) {
				const comments = await getComments();
				const favoriteItems = await getUserFavoriteParsers();
				const parsersList = response.data.results.map((parser) => {
					const isFavoriteItem = favoriteItems.find(
						(item) => item.parser.id === parser.id
					);
					const matchedComment = comments.find(
						(commentItem) => commentItem.parser === parser.id
					);
					if (matchedComment) {
						return {
							...parser,
							favoriteId: isFavoriteItem
								? isFavoriteItem.id
								: null,
							comment: {
								text: matchedComment.comment,
								id: matchedComment.id,
							},
						};
					} else {
						return {
							...parser,
							comment: { text: "", id: null },
							favoriteId: isFavoriteItem
								? isFavoriteItem.id
								: null,
						};
					}
				});
				parsersList.reverse();
				context.commit("SET_ALL_PARSERS", parsersList);
				console.log("Full parser list saved");
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	updateFavoriteParser: async (
		context,
		{ parserToUpdate, userId, favoriteId }
	) => {
		if (favoriteId) {
			await deleteFavoriteParser(favoriteId);
			context.commit("SET_UPDATED_PARSERS", {
				...parserToUpdate,
				favoriteId: null,
			});
			context.commit("SET_UPDATED_ALL_PARSERS", {
				...parserToUpdate,
				favoriteId: null,
			});
		} else {
			const newFavorite = await createFavoriteParser(
				userId,
				parserToUpdate.id
			);
			context.commit("SET_UPDATED_PARSERS", {
				...parserToUpdate,
				favoriteId: newFavorite.id,
			});
			context.commit("SET_UPDATED_ALL_PARSERS", {
				...parserToUpdate,
				favoriteId: newFavorite.id,
			});
		}
	},

	deleteParsersWithEqvalDomain: async (
		context,
		{ domainPartSourceUrl, parsourceId }
	) => {
		try {
			console.log(domainPartSourceUrl, parsourceId);
			const parserIdsToDelete = context.state.all_parsers.reduce(
				(prevArray, parser) => {
					if (
						parser.url.includes(domainPartSourceUrl) &&
						parser.parsource === parsourceId
					) {
						return [...prevArray, parser.id];
					}
					return prevArray;
				},
				[]
			);
			const promiseQuery = parserIdsToDelete.map((parserId) =>
				deleteParser(parserId)
			);
			await Promise.all(promiseQuery);

			const allParsersCopy = JSON.parse(
				JSON.stringify(context.state.all_parsers)
			);
			const updatedAllParsers = allParsersCopy.filter(
				(parser) => !parserIdsToDelete.includes(parser.id)
			);
			context.commit("SET_ALL_PARSERS", updatedAllParsers);

			const parsersCopy = JSON.parse(
				JSON.stringify(context.state.parsers)
			);
			const updatedParsers = parsersCopy.filter(
				(parser) => !parserIdsToDelete.includes(parser.id)
			);
			context.commit("SET_PARSERS", updatedParsers);
			context.commit("SET_PARSERS_PAGINATION", {
				...context.state.parsers_pagination,
				count:
					context.state.parsers_pagination.count -
					parserIdsToDelete.length,
			});
		} catch (error) {
			throw { ...error };
		}
	},

	deleteSelectedParsources: async () => {
		const parsources = store.state.parsers.parsources;
		const ids = parsources.reduce((acc, current) => {
			if (current.selected === true) {
				acc.push(current["id"]);
			}
			return acc;
		}, []);

		if (ids.length > 0) {
			const response = await multiaction_delete("parsource", ids);
			return response;
		} else {
			return "Ничего не выбрано";
		}
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
