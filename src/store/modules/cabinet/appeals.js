import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	appeals: [],
	appeals_pagination: {},

	all_appeals: [],

	appeal: {},

	topics: [
		{
			id: 1,
			description: 'Вопрос по моим парсерам',
		},
		{ id: 2, description: 'Вопрос к менеджеру' },
		{ id: 3, description: 'Вопрос по оплате' },
		{
			id: 4,
			description: 'Вопрос по новому заказу',
		},
		{
			id: 5,
			description:
				'Обращение в службу безопасности',
		},
		{
			id: 6,
			description: 'Предложение о сотрудничестве',
		},
		{
			id: 7,
			description: 'Сообщить об ошибке на сайте',
		},
		{ id: 8, description: 'Другое' },
	],
})

const getters = {}

const mutations = {
	SET_APPEALS: (state, payload) => state.appeals = payload,
	SET_APPEALS_PAGINATION: (state, payload) => state.appeals_pagination = payload,
	CLEAR_APPEALS: (state) => { state.appeals = []; state.appeals_pagination = {} },

	SET_ALL_APPEALS: (state, payload) => state.all_appeals = payload,
	CLEAR_ALL_APPEALS: (state) => state.all_appeals = [],

	SET_APPEAL: (state, payload) => state.appeal = payload,
	CLEAR_APPEAL: (state) => state.appeal = {},

	CLEAR_APPEALS_STATE: (state) => {
		state.appeals = [];
		state.appeals_pagination = {};
		state.all_appeals = [];
		state.appeal = {};
	},
}

const actions = {
	//*get parsources with pagination
	getAppeals: async (context, args) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/users/support/?${args.search ? `search=${args.search}&`: ''}page=${args.page_number}&page_size=${args.page_size}`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_APPEALS', response.data.results);

				let pagination_info = {};

				for (const iterator in response.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = response.data[iterator]
					}
				}
				context.commit('SET_APPEALS_PAGINATION', pagination_info);
				console.log('Appeals list saved');
			}

		}
		catch (err) { throw new Error(err) }
	},

	getAllAppeals: async (context) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/users/support/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_ALL_APPEALS', response.data.results);
			}

		}
		catch (err) { throw new Error(err) }
	},

	getAppeal: async (context, appeal_id) => {
		try {
			const response = await axios.get(`${store.state.baseURL}/users/support/${appeal_id}/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (response.status === 200) {
				context.commit('SET_APPEAL', response.data);
				console.log('Appeal saved');
			}

		}
		catch (err) { throw new Error(err) }
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}