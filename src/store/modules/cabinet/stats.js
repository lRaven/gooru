import { prettyDate } from '@/js/processStrings';

const state = () => ({
	stats: [
		[
			{ id: 1, description: "Парсеров выполняется", value: "3" },
			{ id: 2, description: "Парсеров завершено", value: "0" },
			{
				id: 3,
				description: "Обработанно источников",
				value: "1458",
			},
			{ id: 4, description: "Найдено новых", value: "8" },
		],
		[
			{ id: 1, description: "Парсеров запущено", value: "23" },
			{ id: 2, description: "Парсеров завершено", value: "0" },
			{ id: 3, description: "Обработанно источников", value: "1458" },
			{ id: 4, description: "Найдено новых", value: "8" },
		],
		[
			{ id: 1, description: "Дата оплаты:", value: "15.04.2021" },
			{ id: 3, description: "Повтор оплаты:", value: "16.04.2022" },
			{ id: 4, description: "Сумма к оплате:", value: "16 000 р." },
		],
	],
});

const getters = {};

const mutations = {
	SET_RATE_STATS: (state, payload) => state.stats[2] = payload,
};

const actions = {
	updateRateData(context, payload) {
		const updatedRateData = [];
		context.state.stats[2].forEach((stat) => {
			switch (stat.description) {
				case "Дата оплаты:":
					updatedRateData.push({ ...stat, value: prettyDate(payload.created) });
					break;
				case "Повтор оплаты:":
					updatedRateData.push({ ...stat, value: prettyDate(payload.finish_date) });
					break;
				case "Сумма к оплате:":
					updatedRateData.push({ ...stat, value: `${payload.amount} р.` });
					break;
			}
		});
		context.commit('SET_RATE_STATS', updatedRateData);
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
