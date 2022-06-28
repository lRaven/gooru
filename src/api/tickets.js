import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

async function add_ticket(args) {
	try {
		const response =
			await axios.post(`${store.state.baseURL}/users/support/`,
				{
					name: args.name,
					phone_number: args.phone_number,
					email: args.email,
					message: args.message,
					topic_type: args.topic_type,
					parser: args.parser
				},
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });

		if (response.status === 201) {
			console.log('Ticket created');
			store.dispatch('getAppeals', { page_number: 1, page_size: 10 });
		}
	}

	catch (err) {
		console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
		);
	}
}

export { add_ticket }