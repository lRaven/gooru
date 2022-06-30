import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

async function multiaction_delete(args) {
	try {
		const request =
			await axios.delete(`${store.state.baseURL}/multiaction/delete/`,
				{
					data: {
						model: args.model,
						ids: args.ids,
					},
					headers: {
						Authorization: `token ${cookie.get('auth_token')}`
					}
				}
			);

		if (request.status === 200) {
			console.log(`Elements ${args.ids} in model ${args.model} deleted`);
		}
	}

	catch(error) {
		console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
		);

	throw new Error(error);
	}
}

export { multiaction_delete }