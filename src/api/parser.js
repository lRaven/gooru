import axios from "axios";
import store from "@/store";
import cookie from "vue-cookies";

const getUserParsources = async () => {
	try {
		const { data: userParsource } = await axios.get(
			`${store.state.baseURL}/parsource/`,
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);
        return userParsource.results;
	} catch (error) {
		throw new Error(error);
	}
};

const send_new_parsource = async (args) => {
	try {
		const response = await axios.post(
			`${store.state.baseURL}/parsource/`,
			{
				name: args.name,
				data_source: args.data_source,
				description: args.description,
				parse_fields: args.parse_fields,
			},
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);
		return response;
	} catch (err) {
		throw new Error(err);
	}
};

const delete_parsource = async (parsource_id) => {
	try {
		const response = await axios.delete(
			`${store.state.baseURL}/parsource/${parsource_id}/`,
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);
		return response;
	} catch (err) {
		throw new Error();
	}
};

const updateParsourceName = async ({ id, name }) => {
	try {
		const { data } = await axios.patch(
			`${store.state.baseURL}/parsource/${id}/`,
			{
				name,
			},
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);
		return data.name;
	} catch (error) {
		throw new Error(error);
	}
};

// parser requests

const downloadFile = async ({ type }) => {
	try {
		const response = await fetch(
			`${store.state.baseURL}/parser/download/${type}`,
			{
				method: "GET",
				headers: {
					Authorization: `token ${cookie.get("auth_token")}`,
				},
			}
		);
		if (response.ok) {
			const fileData = await response.blob();
			return fileData;
		}
		const { detail } = await response.json();
		return Promise.reject({ message: detail, status: response.status });
	} catch (error) {
		throw new Error(error);
	}
};

const getComments = async () => {
	try {
		const { data } = await axios.get(`${store.state.baseURL}/comment`, {
			headers: {
				Authorization: `token ${cookie.get("auth_token")}`,
			},
		});
		return data;
	} catch (error) {
		throw new Error(error);
	}
};

const createComment = async ({ comment, parser }) => {
	try {
		const { data } = await axios.post(
			`${store.state.baseURL}/comment/`,
			{
				comment,
				parser,
			},
			{
				headers: {
					Authorization: `token ${cookie.get("auth_token")}`,
				},
			}
		);
		return data;
	} catch (error) {
		throw new Error(error);
	}
};

const updateComment = async ({ id, parser, comment }) => {
	try {
		const { data } = await axios.put(
			`${store.state.baseURL}/comment/${id}/`,
			{
				parser,
				comment,
			},
			{
				headers: {
					Authorization: `token ${cookie.get("auth_token")}`,
				},
			}
		);
		return data;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteComment = async ({ id }) => {
	try {
		await axios.delete(`${store.state.baseURL}/comment/${id}/`, {
			headers: {
				Authorization: `token ${cookie.get("auth_token")}`,
			},
		});
	} catch (error) {
		throw new Error(error);
	}
};

const getUserFavoriteParsers = async () => {
	try {
		const { data: usersFavoriteParsers } = await axios.get(
			`${store.state.baseURL}/usersfavorite`,
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);
		return usersFavoriteParsers.results;
	} catch (error) {
		throw new Error(error);
	}
};

const createFavoriteParser = async ({ user, parser }) => {
	try {
		const { data } = await axios.post(
			`${store.state.baseURL}/usersfavorite/`,
			{
				user,
				parser,
			},
			{
				headers: {
					Authorization: `token ${cookie.get("auth_token")}`,
				},
			}
		);
		return data;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteFavoriteParser = async ({ id }) => {
	try {
		await axios.delete(`${store.state.baseURL}/usersfavorite/${id}`, {
			headers: {
				Authorization: `token ${cookie.get("auth_token")}`,
			},
		});
	} catch (error) {
		throw new Error(error);
	}
};

export {
    getUserParsources,
	send_new_parsource,
	delete_parsource,
	updateParsourceName,
	downloadFile,
	getComments,
	createComment,
	getUserFavoriteParsers,
	createFavoriteParser,
	deleteFavoriteParser,
	updateComment,
	deleteComment,
};
