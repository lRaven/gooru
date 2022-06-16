import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

async function change_password(new_password, current_password) {
	try {
		const request = await axios.post(`${store.state.baseURL}/auth/users/set_password/`, {
			new_password: new_password,
			current_password: current_password,
		}, {
			headers: { Authorization: `token ${cookie.get('auth_token')}` }
		});

		if (request.status === 204) {
			console.log('Password has been successfully changed');
		}
	}
	catch {
		console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
		);
	}
}

export { change_password }