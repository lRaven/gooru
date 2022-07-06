import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

const baseURL = store.state.baseURL;

const send_new_parsource = async (args) => {
	try {
		const response = await axios.post(`${baseURL}/parsource/`, {
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

const delete_parsource = async (parsource_id) => {
	try {
		const response = await axios.delete(`${baseURL}/parsource/${parsource_id}/`, {
			headers: { Authorization: `token ${cookie.get('auth_token')}` }
		});
		return response;
	}
	catch (err) { throw new Error }
}

export { send_new_parsource, delete_parsource }