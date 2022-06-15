import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';


async function change_user_data(user_id, args) {
	try {
		const request = await axios.patch(`${store.state.baseURL}/user/${user_id}/`, {
			first_name: args.first_name,
			last_name: args.last_name,
			phone_number: args.phone_number,
			email: args.email,
		}, {
			headers: { Authorization: `token ${cookie.get('auth_token')}` }
		});

		if (request.status === 200) {
			console.log('User data has been successfully changed');
			store.dispatch('getUserData');
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

export { change_user_data }