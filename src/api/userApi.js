import axios from "axios";
import store from "@/store";
import cookie from "vue-cookies";

const baseURL = process.env.VUE_APP_BACK_URL;

//* auth
const registration = async ({ email, password }) => {
	try {
		const response = await axios.post(`${baseURL}/auth/users/`, {
			username: email,
			email,
			password,
		});
		return response;
	} catch (error) {
		throw error.response;
	}
};

const registrationByReferalLink = async ({ email, password, ref_friend }) => {
	try {
		await axios.post(`${baseURL}/user/`, {
			username: email,
			email,
			password,
			ref_friend,
		});
	} catch (error) {
		throw error.response;
	}
	
};



const login = async ({ username, password }) => {
	try {
		const response = await axios.post(`${baseURL}/auth/token/login/`, {
			username,
			password,
		});
		return response;
	} catch (error) {
		return error.response;
	}
};

const getReferalData = async () => {
	const { data } = await axios.get(
		`${baseURL}/users/referal`,
		{
			headers: { Authorization: `token ${cookie.get("auth_token")}` },
		}
	);
	return data;
};

const logout = async () => {
	try {
		const response = await axios.post(
			`${baseURL}/auth/token/logout/`,
			{},
			{
				headers: { Authorization: `token ${cookie.get("auth_token")}` },
			}
		);

		return response;
	} catch (err) {
		throw new Error(err);

		// 		console.log(`
		// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
		// ⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⡿⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣦⠀⠀⠀⠀
		// ⠀⠀⠀⠀⠀⠀⠀⢰⣿⣽⣷⠀⠙⢷⣦⡀⠀⣀⣀⣠⣤⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⣠⣾⡯⠟⠻⣧⠀⠀⠀
		// ⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠝⣷⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣤⣞⠉⢀⢀⣿⣤⣻⣆⠀⠀
		// ⠀⠀⠀⠀⠀⠀⠀⣿⢿⡟⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡾⠻⣿⣻⣿⡀⠀
		// ⠀⠀⠀⠀⠀⠀⠀⢿⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡼⠿⢻⡇⠀
		// ⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢀⣾⠃⠀
		// ⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⡿⠋⣼⣿⣿⣿⣿⡟⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀
		// ⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⡿⢷⡾⣾⠿⢿⣿⣿⣿⣇⣿⣿⣿⣿⡷⢿⠾⢿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀
		// ⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣅⣼⣅⣿⣀⣼⣿⣿⣿⣿⣿⣿⣿⣿⡇⠈⣧⣬⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀
		// ⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣷⣿⠟⠉⠉⣙⢿⣿⠛⠛⠛⠛⠛⣩⣿⡿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀
		// ⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⠟⠋⠀⢠⣾⣿⣷⣍⠀⠀⠀⠀⠀⠛⢻⣵⣾⣶⡄⠈⢿⣿⣿⣿⣿⣿⣿⣿⠀
		// ⠀⠀⠀⠀⣾⣿⣿⣿⢻⣿⣿⠠⢤⡤⢼⣟⢿⣿⡟⠀⠀⠀⠀⠀⠀⢸⡿⠻⣿⠄⣀⢨⣽⣿⣿⣿⣿⣿⡿⠀
		// ⠀⠀⠀⠀⣿⣿⣿⣿⢸⣿⣿⡆⠀⠀⠀⠙⠟⠋⠀⠀⠀⠀⠀⠀⠀⠈⠿⠿⠋⠀⠙⠻⢾⣿⣿⣿⣿⣿⡇⠀
		// ⠀⠀⠀⠀⣿⣿⣿⣿⢸⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⡇⠀
		// ⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⢿⣿⣿⣿⡇⠀
		// ⠀⠀⠀⠀⣿⣿⣿⣿⣏⠉⠉⠉⠉⠛⢦⣀⠀⠀⠀⠀⠀⠰⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣥⣿⣿⣿⣿⠇⠀
		// ⠀⠀⠀⢀⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠈⠙⠲⣶⣤⣤⣄⣀⣀⣀⣠⡴⠾⠛⠉⣩⣿⣷⣿⣿⣿⣿⣿⠀⠀
		// ⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⢀⣀⣼⠇⠀⠈⠉⠉⠉⠹⣅⡀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
		// ⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣦⠤⢶⣶⢿⣏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠭⠟⢲⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
		// ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠙⠶⣝⣓⣶⣤⣀⣀⣀⣀⣀⣀⣠⠤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
		// ⢀⡾⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠉⠉⠙⢶⣤⣀⣀⣠⠄⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀
		// ⠈⠁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀
		// ⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣦⡀⠀⠀⠀⠀⠀⢠⣾⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
		// ⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⡈⠀⠀⠀⠀⠀⠀⢸⡏⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿
		// ⢠⣾⡟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠉⠁⠀⠀⠀⠀⠀⠀⠸⠦⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
		// ⠀⢾⣥⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣷⠀
		// ⠀⠀⣽⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⢿⡽⠟⠉⢀⣿⠀
		// ⠀⢀⡿⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⠦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⢩⣿⣿⣿⡿⠛⠁⠈⠀⠀⠀⠀⣿⠀
		// ⠀⠸⣥⣀⠀⠀⢻⣿⣿⣿⣿⣿⣿⡉⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣮⢻⣿⣿⠁⠀⠀⠀⠀⠀⠀⢠⡿⠀
		// ⠀⠀⠀⠈⣹⣻⣿⠿⣿⣿⣿⠁⠉⠁⠀⠀⠻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠹⡝⢿⣿⣀⣀⣠⡴⢶⡾⠛⠉⠀⠀
		// ⠀⠀⠀⠀⣿⠙⠃⢀⣿⣿⣇⠀⠀⠀⠀⡆⠀⠙⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡋⠉⠁⠀⢸⡇⠀⠀⠀⠀
		// ⠀⠀⠀⠀⣿⠀⢸⡿⡿⠋⠁⠀⠀⠀⠀⣷⠀⠀⠈⢳⡄⠀⠀⠀⠀⠀⠀⢸⠞⠻⡇⠀⠀⠀⢸⠁⠀⠀⠀⠀
		// ⠀⠀⠀⠀⣿⠀⠈⢻⡇⠀⠀⠀⠀⠀⠀⢻⣆⠀⠀⠀⠹⣆⠀⠀⠀⠀⠀⠈⡆⠀⣷⠀⠀⠠⡟⠀⠀⠀⠀⠀
		// ⠀⠀⠀⠀⡇⠀⠀⣸⡇⠀⠀⠀⠀⠀⠀⠀⠻⠦⣀⣀⣀⡈⢳⡀⠀⠀⠀⠀⢳⡀⠹⡇⠀⠸⡇⠀⠀⠀⠀⠀
		// ⠀⠀⠀⢰⡇⠀⡔⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠃⠙⠃⠀⠀⠀⠈⣷⠀⢿⡀⠰⡇⠀⠀⠀⠀⠀
		// ⠀⠀⠀⢾⠁⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⢘⡇⠀⠀⠀⠀⠀
		// ⠀⠀⠀⢸⡇⠀⣽⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣞⡇⠀⠀⠀⠀⠀
		// ⠀⠀⠀⢨⡇⠀⠉⠓⣶⣦⣤⣄⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⣀⣤⡾⠿⢳⠀⠀⠀⠀⠀
		// ⠀⠀⠀⢸⠀⠀⠀⢠⣸⠀⠀⠉⠉⠉⠉⠛⠛⠛⠛⡗⢲⠖⠒⠒⠒⠒⠒⠒⠚⠋⢹⡟⠀⠀⢸⡆⠀⠀⠀⠀
		// 		`);
	}
};

//* запрос на подтверждение сброса пароля
const reset_password_request = async (email) => {
	try {
		const response = await axios.post(
			`${store.state.baseURL}/user/verify/reset_password/`,
			{ email }
		);[[]]
		return response;
	} catch (err) {
		return err.response;
	}
};

const reset_password = async ({ uid, token, password }) => {
	try {
		const response = await axios.post(
			`${store.state.baseURL}/user/verify/${uid}/${token}/change_password/`,
			{ password }
		);
		return response;
	} catch (err) {
		return err.response;
	}
};

const subscribeToDigest = async (email) => {
	try {
		await axios.post(`${baseURL}/send-mail/`, {
			email,
		});
	} catch (error) {
		throw { ...error };
	}
};

//* операции по тарифам для конкретного пользователя
const getRates = async () => {
	try {
		const { data: rates } = await axios.get(`${baseURL}/tariff`);
		return rates.results;
	} catch (error) {
		throw new Error(error);
	}
};

const getUserRates = async () => {
	try {
		const { data } = await axios.get(`${baseURL}/usertariff`, {
			headers: { Authorization: `token ${cookie.get("auth_token")}` },
		});
		return data.results;
	} catch (error) {
		throw new Error(error);
	}
};

const getUserRate = async ({ id }) => {
	try {
		const { data } = await axios.get(`${baseURL}/usertariff/${id}`, {
			headers: { Authorization: `token ${cookie.get("auth_token")}` },
		});
		return data;
	} catch (error) {
		throw new Error(error);
	}
};

const payRate = async (token, id) => {
	try {
		const response = await axios.get(`${baseURL}/api/pay/${id}/`, {
			headers: {
				Authorization: `token ${token}`,
			},
		});
		return response.data.redirect_url;
	} catch (err) {
		return err.response;
	}
};

//* user data edit
const change_password = async ({ new_password, current_password }) => {
	try {
		const response = await axios.post(
			`${baseURL}/auth/users/set_password/`,
			{ new_password, current_password },
			{ headers: { Authorization: `token ${cookie.get("auth_token")}` } }
		);
		return response;
	} catch (err) {
		return err.response;
	}
};

const change_user_data = async (user_id, args) => {
	try {
		const response = await axios.patch(
			`${baseURL}/user/${user_id}/`,
			{
				first_name: args.first_name,
				last_name: args.last_name,
				phone_number: args.phone_number,
				email: args.email,
			},
			{ headers: { Authorization: `token ${cookie.get("auth_token")}` } }
		);

		return response;
	} catch (err) {
		return err.response;
	}
};

const upload_avatar = async ({ user_id, avatar }) => {
	try {
		const response = await axios.put(
			`${baseURL}/user/upload/${user_id}/`,
			{ avatar },
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

//* admin requests
const updateRate = async (rateObjToUpdate) => {
	try {
		const { data } = await axios.put(
			`${store.state.baseURL}/tariff/${rateObjToUpdate.id}/`,
			rateObjToUpdate,
			{ headers: { Authorization: `token ${cookie.get("auth_token")}` } }
		);
		return data;
	} catch (error) {
		return error.response;
	}
};

const change_manager = async ({ user, manager, user_manager }) => {
	try {
		const response = await axios.patch(
			`${baseURL}/usermanager/${user_manager}/`,
			{ user, manager },
			{ headers: { Authorization: `token ${cookie.get("auth_token")}` } }
		);

		return response;
	} catch (err) {
		throw new Error(err);
	}
};

const delete_user = async (user_id) => {
	try {
		const response = await axios.delete(`${baseURL}/user/${user_id}/`, {
			headers: { Authorization: `token ${cookie.get("auth_token")}` },
		});
		return response;
	} catch (err) {
		return err.response;
	}
};

export {
	registration,
	registrationByReferalLink,
	login,
	getReferalData,
	logout,
	reset_password_request,
	reset_password,
	subscribeToDigest,
	getRates,
	getUserRates,
	getUserRate,
	payRate,
	change_password,
	change_user_data,
	upload_avatar,
	updateRate,
	change_manager,
	delete_user,
};
