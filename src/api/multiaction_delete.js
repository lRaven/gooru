import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

const multiaction_delete = async (args) => {
	try {
		const response =
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

		return response;
	}

	catch (err) { throw new Error(err) }
}

export { multiaction_delete }