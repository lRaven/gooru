<template>
	<section class="brief-number-of-positions">
		<div class="brief-number-of-positions__top">
			<div class="brief-number-of-positions__row">
				<span class="brief-number-of-positions__line"></span>

				<p class="brief-number-of-positions__description">
					Укажите примерное количество данных (услуг, товаров,
					карточек и т.п.), которое вы планируете спарсить.
				</p>
			</div>

			<div class="brief-number-of-positions__row">
				<h1 class="brief-number-of-positions__title">
					<span class="brief-number-of-positions__big-word">от</span>
					и
					<span class="brief-number-of-positions__big-word">до</span>
				</h1>
			</div>

			<div class="brief-number-of-positions__row">
				<p class="brief-number-of-positions__subtitle">
					<span class="brief-number-of-positions__subtitle-bold">
						Количество<br />
						позиций
					</span>
					(Ориентировочно)
				</p>

				<span class="brief-number-of-positions__line"></span>
			</div>
		</div>

		<div class="brief-number-of-positions__bottom">
			<r-double-range-slider
				:selected_min="range[0]"
				:selected_max="range[1]"
				v-model="range"
			></r-double-range-slider>

			<div class="brief-number-of-positions__bottom-row">
				<div
					class="brief-number-of-positions__bottom-col"
					ref="input_min_wrapper"
				>
					<input
						type="number"
						name=""
						id=""
						class="brief-number-of-positions__input"
						ref="input_min"
						v-model="range[0]"
					/>
				</div>

				<r-button
					description="Подвиньтесь!"
					:disabled="isDisabledBtn"
					@click="
						SET_NUMBER_OF_POSITIONS(range);
						this.$emit('moveToNextPage');
					"
				></r-button>

				<div
					class="brief-number-of-positions__bottom-col"
					ref="input_max_wrapper"
				>
					<input
						type="number"
						name=""
						id=""
						class="brief-number-of-positions__input"
						v-model="range[1]"
						ref="input_max"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import rDoubleRangeSlider from "@/components/Brief/r-double-range-slider";
	import rButton from "@/components/Brief/r-button";
	import { mapMutations } from "vuex";

	export default {
		name: "BriefNumberOfPositions",
		components: {
			rDoubleRangeSlider,
			rButton,
		},
		watch: {
			range: {
				handler: function () {
					this.resizeInputByContent();
				},
				deep: true,
			},
		},
		computed: {
			input_min_length() {
				return this.range[0].toString().length;
			},
			input_max_length() {
				return this.range[1].toString().length;
			},
		},
		data() {
			return {
				isDisabledBtn: false,
				range: [100, 100000],
			};
		},
		methods: {
			...mapMutations(["SET_NUMBER_OF_POSITIONS"]),
			resizeInputByContent() {
				this.$refs.input_min_wrapper.setAttribute(
					"style",
					`width: ${105 + 30 * this.input_min_length}px`
				);

				this.$refs.input_max_wrapper.setAttribute(
					"style",
					`width: ${105 + 30 * this.input_max_length}px`
				);
			},
		},
		mounted() {
			this.resizeInputByContent();
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-number-of-positions {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 5rem;

		&__top {
			display: flex;
			flex-direction: column;
			gap: 3rem;
		}

		&__row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 100rem;
			gap: 10rem;
			&:nth-child(3) {
				align-items: flex-start;
			}
		}

		&__line {
			display: block;
			background-color: $white;
			width: 100%;
			height: 0.6rem;
		}
		&__description {
			font-size: 2.4rem;
			line-height: 1.2;
		}

		&__title {
			text-transform: uppercase;
			font-size: 8.6rem;
			font-weight: 700;
			color: #00b2ef;
			margin-bottom: 2rem;
		}
		&__big-word {
			font-size: 23rem;
		}

		&__subtitle {
			text-transform: uppercase;
			display: flex;
			flex-direction: column;
			gap: 3rem;
			font-size: 3.6rem;
			&-bold {
				font-weight: 700;
				font-size: 4.8rem;
			}
		}

		&__bottom {
			&-row {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				align-items: center;
				justify-content: space-between;
				margin-top: 4rem;
			}
			&-col {
				transition: all 0.2s ease;
				min-width: 14rem;
				&:last-child {
					margin-left: auto;
				}
			}
		}

		&__input,
		.r-button {
			width: max-content;
		}

		&__input {
			color: $white;
			font-size: 4.8rem;
			padding: 1rem 5rem;
			background-color: transparent;
			border: 0.2rem solid #00a9e8;
			border-radius: 5rem;
			width: 100%;
		}
		.r-button {
			margin: 0 auto;
		}
	}
</style>
