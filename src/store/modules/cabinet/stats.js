const state = () => ({
	stats: [
		[
			{ id: 1, description: "Парсеров выполняется", value: '3' },
			{ id: 2, description: "Парсеров завершено", value: '0' },
			{
				id: 3, description: "Обработанно источников", value:
					'1458'
			},
			{ id: 4, description: "Найдено новых", value: '8' },
		],
		[
			{ id: 1, description: "Парсеров запущено", value: '23' },
			{ id: 2, description: "Парсеров завершено", value: '0' },
			{ id: 3, description: "Обработанно источников", value: '1458' },
			{ id: 4, description: "Найдено новых", value: '8' },
		],
		[
			{ id: 1, description: "Дата оплаты:", value: "15.04.2021" },
			{ id: 2, description: "Суммы оплаты:", value: "15 500 р." },
			{ id: 3, description: "Повтор оплаты:", value: "16.04.2022" },
			{ id: 4, description: "Сумма к оплате:", value: "16 000 р." },
		],
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