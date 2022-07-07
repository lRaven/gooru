import axios from 'axios';
import store from '@/store';
import cookie from 'vue-cookies';

const baseURL = store.state.baseURL;

const add_ticket = async (args) => {
	try {
		const response =
			await axios.post(`${baseURL}/users/support/`,
				{
					name: args.name,
					phone_number: args.phone_number,
					email: args.email,
					message: args.message,
					topic_type: args.topic_type,
					parser: args.parser
				},
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } });

		return response;
	}

	catch (err) { throw new Error(err) }
}

export { add_ticket }