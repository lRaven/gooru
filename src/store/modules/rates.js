const state = () => ({
	rates: [
		{
			id: 1,
			name: "Ознакомительный",
			price: 0,
			checklist: [
				{ id: 1, text: "1 веб-сайт" },
				{ id: 2, text: "Комплект" },
				{ id: 3, text: "Высокое доверие" },
				{ id: 4, text: "Добавка парсинга" },
			],
		},
		{
			id: 2,
			name: "Ознакомительный",
			price: 560,
			checklist: [
				{ id: 1, text: "1 веб-сайт" },
				{ id: 2, text: "Комплект" },
				{ id: 3, text: "Высокое доверие" },
				{ id: 4, text: "Добавка парсинга" },
			],
		},
		{
			id: 3,
			name: "Ознакомительный",
			price: 2440,
			checklist: [
				{ id: 1, text: "1 веб-сайт" },
				{ id: 2, text: "Комплект" },
				{ id: 3, text: "Высокое доверие" },
				{ id: 4, text: "Добавка парсинга" },
				{ id: 5, text: "Добавка парсинга" },
			],
		},
		{
			id: 4,
			name: "Ознакомительный",
			price: 15800,
			checklist: [
				{ id: 1, text: "1 веб-сайт" },
				{ id: 2, text: "Комплект" },
				{ id: 3, text: "Высокое доверие" },
				{ id: 4, text: "Добавка парсинга" },
			],
		},
	],
})

const getters = {}

const mutations = {}

const actions = {}

export default {
	state,
	getters,
	mutations,
	actions,
}