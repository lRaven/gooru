const state = () => ({
	client_status: {
		value: '',
		self_option: '',
	},
	fields_of_activity: {
		value: '',
		self_option: '',
	},
	site_types: {
		value: '',
		self_option: '',
	},
	additional_parameters: [],
	number_of_positions: [],
	source: {},
	user_contacts: [],
})

const getters = {}

const mutations = {
	SET_CLIENT_STATUS: (state, payload) => state.client_status.value = payload,
	SET_CLIENT_STATUS_SELF_OPTION: (state, payload) => state.client_status.self_option = payload,

	SET_FIELDS_OF_ACTIVITY: (state, payload) => state.fields_of_activity.value = payload,
	SET_FIELDS_OF_ACTIVITY_SELF_OPTION: (state, payload) => state.fields_of_activity.self_option = payload,

	SET_SITE_TYPES: (state, payload) => state.site_types.value = payload,
	SET_SITE_TYPES_SELF_OPTION: (state, payload) => state.site_types.self_option = payload,

	SET_ADDITIONAL_PARAMETERS: (state, payload) => state.additional_parameters = payload,
	SET_NUMBER_OF_POSITIONS: (state, payload) => state.number_of_positions = payload,
	SET_SOURCE: (state, payload) => state.source = payload,
	SET_USER_CONTACTS: (state, payload) => state.user_contacts = payload,
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}