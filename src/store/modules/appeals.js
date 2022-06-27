import cookie from 'vue-cookies';
import axios from 'axios';
import store from '@/store';

const state = () => ({
	appeals: [],
	appeals_pagination: {},
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
	SET_APPEAL: (state, payload) => state.appeal = payload,
}

const actions = {
	//*get parsources with pagination
	getAppeals: async (context, args) => {
		try {
			const request = await axios.get(`${store.state.baseURL}/users/support/?page=${args.page_number}&page_size=${args.page_size}`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_APPEALS', request.data.results);
				let pagination_info = {};

				for (const iterator in request.data) {
					if (iterator !== 'results') {
						pagination_info[iterator] = request.data[iterator]
					}
				}
				context.commit('SET_APPEALS_PAGINATION', pagination_info);
				console.log('Appeals list saved');
			}
		}
		catch (err) {
			console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
			);
		}
	},

	getAppeal: async (context, appeal_id) => {
		try {
			const request = await axios.get(`${store.state.baseURL}/users/support/${appeal_id}/`,
				{ headers: { Authorization: `token ${cookie.get('auth_token')}` } })

			if (request.status === 200) {
				context.commit('SET_APPEAL', request.data);
				console.log('Appeal saved');
			}

		}
		catch (err) {
			console.error(`
∧＿∧
(｡･ω･｡)つ━☆・*。
⊂\\  /   ・゜+.
しーＪ\\  °。+  Something went wrong.`
			);
		}
	},
}

export default {
	state,
	getters,
	mutations,
	actions,
}