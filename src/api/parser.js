import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

const send_new_parsource = async (args) => {
	try {
		const response = await axios.post(`${store.state.baseURL}/parsource/`, {
			name: args.name,
			data_source: args.data_source,
			description: args.description,
			parse_fields: args.parse_fields,
		}, {
			headers: { Authorization: `token ${cookie.get("auth_token")}`, },
		});
		return response;
	}
	catch (err) { throw new Error(err); }
}

export { send_new_parsource }