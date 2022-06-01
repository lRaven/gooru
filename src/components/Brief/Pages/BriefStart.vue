<template>
	<section class="brief-start">
		<p class="brief-start__title">
			<span class="brief-start__title-bold">
				парсинг<br />по вашему<br />запросу:<br />
			</span>
			соберём<br />необходимое
		</p>

		<r-button
			description="ОК, обратиться!"
			@click="this.$emit('moveToNextPage')"
		></r-button>

		<p class="brief-start__description">
			Вам нужны данные опросов?<br />
			Контент новостных сайтов?<br />
			Данные интернет-магазинов?<br />
			Вы обратились по адресу.
		</p>
	</section>
</template>

<script>
	import rButton from "@/components/Brief/r-button";

	export default {
		name: "BriefStart",
		components: {
			rButton,
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-start {
		overflow: visible;
		display: grid;
		grid-template-columns: repeat(2, max-content);
		grid-template-rows: repeat(2, max-content);
		grid-gap: 5rem;
		justify-content: space-between;
		padding: 5rem 0;
		&__title {
			width: fit-content;
			position: relative;
			font-size: 4.8rem;
			line-height: 1.3;
			padding-top: 2rem;
			margin-bottom: 5rem;
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				width: 70%;
				height: 0.6rem;
				background-color: $white;
			}
			&-bold {
				text-transform: uppercase;
				font-weight: 700;
			}
		}
		&__description {
			font-size: 2.4rem;
			line-height: 1.3;
		}
	}
</style>
