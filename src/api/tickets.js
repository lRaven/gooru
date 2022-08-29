import axios from 'axios';
import cookie from 'vue-cookies';

const add_ticket = async (ticketData) => {
	try {
		const isAuthUser = cookie.get("auth_token");
		const response =
			await axios.post(`${process.env.VUE_APP_BACK_URL}/users/support/`,
				{
					...ticketData,
				},
				{ headers: isAuthUser ? {Authorization: `token ${cookie.get('auth_token')}`} : '' });

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