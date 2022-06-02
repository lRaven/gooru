const state = () => ({
	client_status: null,
	fields_of_activity: [],
	site_types: [],
	additional_parameters: [],
	number_of_positions: [],
	sources: [],
	user_contacts: [],
})

const getters = {}

const mutations = {
	SET_CLIENT_STATUS: (state, payload) => state.client_status = payload,
	SET_FIELDS_OF_ACTIVITY: (state, payload) => state.fields_of_activity = payload,
	SET_SITE_TYPES: (state, payload) => state.site_types = payload,
	SET_ADDITIONAL_PARAMETERS: (state, payload) => state.additional_parameters = payload,
	SET_NUMBER_OF_POSITIONS: (state, payload) => state.number_of_positions = payload,
	SET_SOURCES: (state, payload) => state.sources = payload,
	SET_USER_CONTACTS: (state, payload) => state.user_contacts = payload,
}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}