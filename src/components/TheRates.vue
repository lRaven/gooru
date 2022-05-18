<template>
	<section class="the-rates" id="rates">
		<div class="the-rates__container center">
			<rates-slider title="Тарифы" :slides="rates_list"></rates-slider>
		</div>
	</section>
</template>

<script>
	import RatesSlider from "@/components/Rates/RatesSlider";

	export default {
		name: "TheRates",
		components: {
			RatesSlider,
		},
		data: () => ({
			rates_list: [
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
