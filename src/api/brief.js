import axios from 'axios';
import store from '@/store';

const send_brief = async (brief) => {
	try {
		const response = await axios.post(`${store.state.baseURL}/brief/`, {
			client_status: brief.client_status,
			client_status_self_option: brief.client_status_self_option,

			fields_of_activity: brief.fields_of_activity,
			fields_of_activity_self_option: brief.fields_of_activity_self_option,

			site_types: brief.site_types,
			site_types_self_option: brief.site_types_self_option,

			additional_options: brief.additional_parameters,

			number_of_position_min: brief.number_of_positions[0],
			number_of_position_max: brief.number_of_positions[1],

			source_amount: brief.source,

			name: brief.user_contacts.email,
		});
		return response;
	}
	catch (err) { throw new Error(err) }
}

export { send_brief }