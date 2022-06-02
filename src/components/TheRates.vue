<template>
	<section class="the-rates" id="rates">
		<div class="the-rates__container center">
			<rates-slider title="Тарифы" :slides="rates"></rates-slider>
		</div>
	</section>
</template>

<script>
	import RatesSlider from "@/components/Rates/RatesSlider";
	import { mapState } from "vuex";

	export default {
		name: "TheRates",
		components: {
			RatesSlider,
		},
		computed: {
			...mapState({
				rates: (state) => state.rates.rates,
			}),
		},
		data: () => ({
			rates_list: [],
		}),
	};
</script>

<style lang="scss" scoped>
	.the-rates {
		padding: 10rem 4rem;
		&__title {
			text-align: center;
			margin-bottom: 6rem;
		}
	}
	@media (max-width: 767px) {
		.the-rates {
			padding: 2rem 1.5rem;
		}
	}
</style>
