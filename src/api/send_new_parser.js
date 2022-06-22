import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

async function send_new_parser(args) {
	try {
		const request = await axios.post(`${store.state.baseURL}/parsource/`, {
			name: args.name,
			data_source: args.data_source,
			description: args.description,
			parse_fields: args.parse_fields,
		}, {
			headers: { Authorization: `token ${cookie.get("auth_token")}`, },
		});

		console.log(request);
		if (request.status === 204) {
			// console.log("Logout successfully");
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

export { send_new_parser }