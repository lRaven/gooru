const state = () => ({ tab: 'appeals' })

const getters = { TAB: state => state.tab }

const mutations = { SET_TAB: (state, payload) => state.tab = payload }

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}