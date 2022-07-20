import { updateRate, getRates } from "@/api/userApi";

const deserializeRate = ({ id, description, cost, name }) => {
	const texts = description.split(";");
	const checkList = texts.map((textItem, index) => {
		return { id: index + 1, text: textItem };
	});
	let price = cost !== 0 ? cost : null;
	return { id, name, price, checkList: checkList };
};

const serializeRate = (rate) => {
	const description = rate.checkList.reduce((prev, checkItem) => {
		return prev + checkItem.text + ";";
	}, "");
	return {
		id: rate.id,
		cost: rate.price,
		name: rate.name,
		description: description.slice(0, description.length - 1),
	};
};

const state = () => ({
	rates: [
		{
			id: 1,
			name: "Интеллектуал",
			price: 1500,
			checklist: [
				{ id: 1, text: "1-3 веб-ресурса" },
				{ id: 2, text: "Сбор данных до 5 страниц" },
				{ id: 3, text: "До 100 позиций в день" },
				{ id: 4, text: "Выгрузка в csv, json, xls" },
				{ id: 5, text: "Хранилище 1Гб" },
			],
			description:
				"Сбор данных с 1-3 х сайтов, с количеством сбора до 5-ти страниц со всех сайтов, с возможностью выгрузки в таблицу, с выдачей до 100 новостных позиций (статей, заголовков) в день и/или до 15-ти графических (медиа, фото) материалов в день. С общим количеством поступающей информации - 1 ГБ в месяц. Стоимость Тарифа - 1500 рублей.",
		},
		{
			id: 2,
			name: "Бизнес",
			price: 6000,
			checklist: [
				{ id: 1, text: "1-10 веб-ресурсов" },
				{ id: 2, text: "Сбор данных 15 страниц" },
				{ id: 3, text: "До 300 позиций в день" },
				{ id: 4, text: "Выгрузка в csv, json, xls" },
				{ id: 5, text: "Хранилище 2Гб" },
			],
			description:
				"Сбор данных 1 -10 х сайтов, до 15 страниц со всех сайтов, с возможностью передачи в таблицу, либо передачей поступающей информации непосредственно в интернет ресурс пользователя сервисом, с выдачей до 100 новостных страниц(статей, заголовков) в день и/ или до 15 - ти графических(медиа, фото) материалов в день*.",
			disclaimer:
				"* тариф не распространяет свое действие при условии, что у клиента сайт не имеет собственного API, сайт сверстан на конструкторе(тильда или иные) сайт сверстан на CMS не имеющих API",
		},
		{
			id: 3,
			name: "Блогер",
			price: 9000,
			checklist: [
				{ id: 1, text: "1-10 веб-ресурсов" },
				{ id: 2, text: "Сбор данных до 15 страниц" },
				{ id: 3, text: "До 500 позиций в день" },
				{ id: 4, text: "Выгрузка в csv, json, xls + соцсети" },
				{ id: 5, text: "Хранилище 3ГБ" },
			],
			description:
				"Сбор данных 1 -10 х сайтов, до 15 страниц со всех сайтов, с возможностью передачи в таблицу, либо передачей поступающей информации непосредственно в интернет ресурс пользователя сервисом и/или социальные сети пользователя сервисом, с выдачей до 100 новостных страниц (статей, заголовков) в день и/или до 15-ти графических (медиа, фото) материалов*.",
			disclaimer:
				"*тариф не распространяет свое действие при условии, что у клиента сайт не имеет собственного API, сайт сверстан на конструкторе(тильда или иные) сайт сверстан на CMS не имеющих API",
		},
		{
			id: 4,
			name: "Персональный",
			price: null,
			checklist: [
				{
					id: 1,
					text: "Индивидуальный расчёт стоимости парса с учетом особенностей пользования интернет ресурсами потребителем сервиса.",
				},
				{ id: 2, text: "Интеграция с API" },
			],
			description:
				"Индивидуальный расчёт стоимости парса с учетом особенностей пользования интернет ресурсами потребителем сервиса.",
		},
	],
});

const getters = {};

const mutations = {
	SET_RATES: (state, payload) => (state.rates = payload),
};

const actions = {
	async getRates(context) {
		try {
			const rates = await getRates();

			const ratesWithCheckList = rates.map( rate => {
				return deserializeRate(rate);
			});

			const sortedRatesWithCheckList = ratesWithCheckList.sort(
				(leftItem, rightItem) => {
					if (rightItem.price - leftItem.price > 0) {
						return -1;
					} else if (
						rightItem.price === null ||
						leftItem.price === null
					) {
						return 1;
					} else {
						return 1;
					}
				}
			);
			const vipPriceRate = sortedRatesWithCheckList.shift();
			sortedRatesWithCheckList.push(vipPriceRate);
			context.commit("SET_RATES", sortedRatesWithCheckList);
		} catch (error) {
			throw new Error(error);
		}
	},

	async updateRate(context, payload) {
		try {
			const serializedRateToUpdate = serializeRate(payload);
			serializedRateToUpdate.cost === null ? serializedRateToUpdate.cost = 0 : serializedRateToUpdate.cost;
			const updatedRate = await updateRate(serializedRateToUpdate);

			const updatedRates = context.state.rates.map((rate) => {
				if (rate.id === updatedRate.id) {
					return deserializeRate(updatedRate);
				} else {
					return rate;
				}
			});

			context.commit("SET_RATES", updatedRates);
		} catch (error) {
			throw new Error(error);
		}
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
