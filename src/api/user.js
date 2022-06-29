import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

const baseURL = store.state.baseURL;

//* auth
const registration = async ({ email, username, password }) => {
	try {
		const response = await axios.post(`${baseURL}/auth/users/`, {
			email,
			username,
			password,
		});
		return response;

	} catch (error) {
		throw new Error(error);
	}
}

const registration_by_tel = async () => {
	try {
		const response = await axios.post(`${baseURL}/user/auth/tel/`,
			{}
		);
		console.log(response);
		return response;
	}
	catch (err) { throw new Error }
}

const login = async ({ username, password }) => {
	try {
		const response = await axios.post(`${baseURL}/auth/token/login/`, {
			username,
			password,
		});
		return response;
	} catch (error) { throw new Error(error) }
}

const logout = async () => {
	try {
		const response = await axios.post(`${baseURL}/auth/token/logout/`, {}, {
			headers: { Authorization: `token ${cookie.get("auth_token")}`, },
		});

		return response;
	}
	catch (err) {
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
}

//* user data edit 
const change_password = async ({ new_password, current_password }) => {
	try {
		const response = await axios.post(`${baseURL}/auth/users/set_password/`, {
			new_password,
			current_password,
		}, {
			headers: { Authorization: `token ${cookie.get('auth_token')}` }
		});
		return response;
	}
	catch (err) { throw new Error(err) }
}

const change_user_data = async (user_id, args) => {
	try {
		const response = await axios.patch(`${baseURL}/user/${user_id}/`, {
			first_name: args.first_name,
			last_name: args.last_name,
			phone_number: args.phone_number,
			email: args.email,
		}, { headers: { Authorization: `token ${cookie.get('auth_token')}` } });

		return response;
	}
	catch (err) { throw new Error(err) }
}

const upload_avatar = async ({ user_id, avatar }) => {
	try {
		const response = await axios.patch(`${baseURL}/user/upload/${user_id}/`,
			{ avatar },
			{
				headers: {
					Authorization: `token ${cookie.get('auth_token')}`,
					'Content-Type': 'multipart/form-data'
				}
			});
		return response;
	}
	catch (err) { throw new Error(err) }
}

export {
	registration,
	registration_by_tel,
	login,
	logout,
	change_password,
	change_user_data,
	upload_avatar
};