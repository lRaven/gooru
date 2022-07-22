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
	rates: [],
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
