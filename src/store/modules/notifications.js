const state = () => ({ notification_status: null, })

const getters = {}

const mutations = { SET_NOTIFICATION_STATUS: (state, payload) => state.notification_status = payload, }

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}