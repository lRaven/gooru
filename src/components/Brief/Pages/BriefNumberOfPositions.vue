<template>
	<section class="brief-number-of-positions">
		<div class="brief-number-of-positions__row">
			<p class="brief-number-of-positions__description">
				Укажите примерное количество данных (услуг, товаров, карточек и
				т.п.), которое вы планируете спарсить.
			</p>

			<p class="brief-number-of-positions__title">
				<span class="brief-number-of-positions__big-word">от</span>
				и
				<span class="brief-number-of-positions__big-word">до</span>
			</p>
			<p class="brief-number-of-positions__subtitle">
				<span class="brief-number-of-positions__subtitle-bold">
					Количество<br />
					позиций
				</span>
				(Ориентировочно)
			</p>
		</div>

		<div class="brief-number-of-positions__row">
			<r-double-range-slider></r-double-range-slider>
		</div>
	</section>
</template>

<script>
	import rDoubleRangeSlider from "@/components/Brief/r-double-range-slider";

	export default {
		name: "BriefNumberOfPositions",
		components: {
			rDoubleRangeSlider,
		},
	};
</script>

<style lang="scss" scoped>
	.brief-number-of-positions {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 5rem 0;
		overflow: visible;

		&__title {
		}

		&__descripiton {
		}

		&__subtitle {
			font-size: 4.8rem;
			&-bold {
				font-weight: 700;
			}
		}
	}
</style>
