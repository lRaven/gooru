import axios from "axios";
import store from "@/store";
import cookie from "vue-cookies";

let baseURL;
setTimeout(() => {
	baseURL = store.state.baseURL;
}, 0);

const send_new_parsource = async (args) => {
	try {
		const response = await axios.post(
			`${store.state.baseURL}/parsource/`,
			{	
				...args
			},
			{ headers: { Authorization: `token ${cookie.get("auth_token")}` } }
		);
		return response;
	} catch (err) {
		return err.response;
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

const updateParsourceImage = async ({ parsource_id, image }) => {
	try {
		const response = await axios.patch(
			`${baseURL}/parsource/uploadscreen/${parsource_id}/`,
			{ screenshot: image },
			{
				headers: {
					Authorization: `token ${cookie.get("auth_token")}`,
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response;
	} catch (err) {
		return err.response;
	}
};

//* parser requests
const getSharedParser = async (id) => {
	try {
		const { data: parserData } = await axios.get(`${process.env.VUE_APP_BACK_URL}/public-parser/${id}`);
		return parserData;
	} catch (error) {
		throw { ...error };
	}
};

const editParserData = async ({ id, updatedData }) => {
	try {
		const { data: updatedParserData } = await axios.patch(
			`${process.env.VUE_APP_BACK_URL}/parser/${id}/`,
			{
				...updatedData,
			},
			{
				headers: {
					Authorization: `token ${cookie.get("auth_token")}`,
				},
			}
		);
		return updatedParserData;
	} catch (error) {
		throw { ...error };
	}
};

const deleteParser = async (parserId) => {
	try {
		await axios.delete(
			`${process.env.VUE_APP_BACK_URL}/parser/${parserId}/`,
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);
	} catch (error) {
		throw { ...error };
	}
};

const downloadFile = async ({ type }) => {
	try {
		const response = await fetch(
			`${store.state.baseURL}/parser/download/${type}/select/`,
			{
				method: "POST",
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
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

const downloadParsers = async ({ parsourceId, parserIds, date }, type = 'excel') => {
	const requestObject = {};
	if (parsourceId) {
		requestObject.parsource = parsourceId;
	}
	if (parserIds?.length) {
		requestObject.parser_ids = parserIds;
	}
	if (date) {
		requestObject.create__gte = date;
	}
	try {
		const response = await fetch(
			`${process.env.VUE_APP_BACK_URL}/parser/download/${type}/select/`,
			{
				method: "POST",
				headers: { Authorization: `token ${cookie.get("auth_token")}`, 'content-type': 'application/json' },
				body: JSON.stringify(requestObject),
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

const createFavoriteParser = async (userId, parserId) => {
	try {
		const { data } = await axios.post(
			`${store.state.baseURL}/usersfavorite/`,
			{
				user: userId,
				parser: parserId,
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

const deleteFavoriteParser = async (id) => {
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
	send_new_parsource,
	delete_parsource,
	updateParsourceName,
	updateParsourceImage,
	getSharedParser,
	editParserData,
	deleteParser,
	downloadFile,
	downloadParsers,
	getComments,
	createComment,
	getUserFavoriteParsers,
	createFavoriteParser,
	deleteFavoriteParser,
	updateComment,
	deleteComment,
};
