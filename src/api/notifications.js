import axios from "axios";
import cookie from "vue-cookies";
import store from "@/store";

const read_notification = async (args) => {
	try {
		const response = await axios.patch(`${store.state.baseURL}/notify/${args.notification_id}/`,
			{ checked: args.read, user: args.user_id, },
			{ headers: { Authorization: `token ${cookie.get('auth_token')}` } },
		);
		return response;
	}
	catch (err) { throw new Error }
}

export { read_notification }