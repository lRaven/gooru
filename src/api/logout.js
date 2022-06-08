import axios from 'axios';
import store from 'vuex';

async function logout() {
	try {
		const request = await axios.post(`${store.state.baseURL}/auth/token/logout/`);

		if (request.status === 201) {
			console.log("Logout successfully");
		}
	}
	catch {
		console.log("Something went wrong.");
	}
}

export { logout }