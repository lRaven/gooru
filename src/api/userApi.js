import axios from "axios";
import store from "@/store";
import cookie from "vue-cookies";

const baseURL = store.state.baseURL;

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
		throw new Error(error);
	}
};

const registration_by_tel = async () => {
	try {
		const response = await axios.post(`${baseURL}/user/auth/tel/`, {});
		return response;
	} catch (err) {
		throw new Error();
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
		throw new Error(error);
	}
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

// операции по тарифам для конкретного пользователя

const getRates = async () => {
	try {
		const { data:rates } = await axios.get(`${baseURL}/tariff`, {
			headers: {
				Authorization: `token ${cookie.get("auth_token")}`,
			},
		});
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

//* user data edit
const change_password = async ({ new_password, current_password }) => {
	try {
		const response = await axios.post(
			`${baseURL}/auth/users/set_password/`,
			{
				new_password,
				current_password,
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
		throw new Error(err);
	}
};

const upload_avatar = async ({ user_id, avatar }) => {
	try {
		const response = await axios.patch(
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
		throw new Error(err);
	}
};

// admin requests

const updateRate = async (rateObjToUpdate) => {
	try {
		const { data } = await axios.put(
			`${store.state.baseURL}/tariff/${rateObjToUpdate.id}/`,
			rateObjToUpdate,
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

const change_manager = async ({ user, manager, user_manager }) => {
	try {
		const response = await axios.patch(
			`${baseURL}/usermanager/${user_manager}/`,
			{
				user,
				manager,
			},
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
		throw new Error(err);
	}
};

export {
	registration,
	registration_by_tel,
	login,
	logout,
	getRates,
	getUserRates,
	getUserRate,
	change_password,
	change_user_data,
	upload_avatar,
	updateRate,
	change_manager,
	delete_user,
};
