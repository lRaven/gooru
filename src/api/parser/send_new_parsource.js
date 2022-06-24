import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

async function send_new_parsource(args) {
	try {
		const request = await axios.post(`${store.state.baseURL}/parsource/`, {
			name: args.name,
			data_source: args.data_source,
			description: args.description,
			parse_fields: args.parse_fields,
		}, {
			headers: { Authorization: `token ${cookie.get("auth_token")}`, },
		});

		if (request.status === 201) {
			console.log("New parsource created");
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

export { send_new_parsource }