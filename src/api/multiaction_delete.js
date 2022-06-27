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

			store.dispatch(args.model_update.name, args.model_update.data);
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

export { multiaction_delete }