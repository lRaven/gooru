const state = () => ({
	client_status: null,
	fields_of_activity: [],
	site_types: [],
	additional_parameters: [],
})

const mutations = {
	SET_CLIENT_STATUS: (state, payload) => state.client_status = payload,
	SET_FIELDS_OF_ACTIVITY: (state, payload) => state.fields_of_activity = payload,
	SET_SITE_TYPES: (state, payload) => state.site_types = payload,
	SET_ADDITIONAL_PARAMETERS: (state, payload) => state.additional_parameters = payload,
}

const actions = {}

export default {
	state,
	mutations,
	actions,
}