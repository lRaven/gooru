import axios from 'axios';
import cookie from 'vue-cookies';

const add_ticket = async (args) => {
	try {
		const response =
			await axios.post(`${process.env.VUE_APP_BACK_URL}/users/support/`,
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

	catch (err) { return err.response }
};

const getTicketMessages = async (ticketId) => {
	try {
		const { data: messages } = await axios.get(`${process.env.VUE_APP_BACK_URL}/supportchat/?ticket__id=${ticketId}`, {
			headers: {
				Authorization: `token ${cookie.get('auth_token')}`,
			},
		});
		return messages;
	} catch (error) {
		throw {...error};
	}
}

export { add_ticket, getTicketMessages }