<template>
	<section class="brief-number-of-positions">
		<div class="brief-number-of-positions__top">
			<div class="brief-number-of-positions__row">
				<hr class="brief-number-of-positions__horizontal-rule" />

				<p class="brief-number-of-positions__description">
					Укажите примерное количество данных (услуг, товаров,
					карточек и т.п.), которое вы планируете спарсить.
				</p>
			</div>

			<div class="brief-number-of-positions__title">
				<div class="brief-number-of-positions__title-row">
					<span class="brief-number-of-positions__big-word">
						от
					</span>

					<div
						class="brief-number-of-positions__input-wrapper"
						ref="input_min_wrapper"
						v-if="document_width <= 1023"
					>
						<input
							type="number"
							name=""
							class="brief-number-of-positions__input"
							ref="input_min"
							v-model="range[0]"
						/>
					</div>
				</div>

				<div class="brief-number-of-positions__title-row">
					<p class="brief-number-of-positions__title-and">и</p>
					<span class="brief-number-of-positions__big-word">
						до
					</span>

					<div
						class="brief-number-of-positions__input-wrapper"
						ref="input_max_wrapper"
						v-if="document_width <= 1023"
					>
						<input
							type="number"
							name=""
							class="brief-number-of-positions__input"
							v-model="range[1]"
							ref="input_max"
						/>
					</div>
				</div>
			</div>

			<div class="brief-number-of-positions__row">
				<p class="brief-number-of-positions__subtitle">
					<span class="brief-number-of-positions__subtitle-bold">
						Количество<br />
						позиций
					</span>
					(Ориентировочно)
				</p>

				<hr class="brief-number-of-positions__horizontal-rule" />
			</div>
		</div>

		<div class="brief-number-of-positions__bottom">
			<r-double-range-slider
				:selected_min="range[0]"
				:selected_max="range[1]"
				v-model="range"
				v-show="document_width > 1023"
			></r-double-range-slider>

			<div class="brief-number-of-positions__bottom-row">
				<div
					class="brief-number-of-positions__input-wrapper"
					ref="input_min_wrapper"
					v-if="document_width > 1023"
				>
					<input
						type="number"
						name=""
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
					class="brief-number-of-positions__input-wrapper"
					ref="input_max_wrapper"
					v-if="document_width > 1023"
				>
					<input
						type="number"
						name=""
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
		props: { document_width: Number },
		watch: {
			range: {
				handler: function () {
					this.document_width <= 540
						? this.resizeInputByContent(42.5, 22, "mobile")
						: this.resizeInputByContent(52.5, 30, "pc");
				},
				deep: true,
			},
			document_width() {
				this.document_width <= 540
					? this.resizeInputByContent(42.5, 22, "mobile")
					: this.resizeInputByContent(52.5, 30, "pc");
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
			resizeInputByContent(padding, font_size, version) {
				switch (version) {
					case "mobile": {
						this.$refs.input_min_wrapper.setAttribute(
							"style",
							`width: ${
								padding * 2 + font_size * this.input_min_length
							}px`
						);

						this.$refs.input_max_wrapper.setAttribute(
							"style",
							"width: 100%"
						);

						break;
					}

					case "pc": {
						this.$refs.input_min_wrapper.setAttribute(
							"style",
							`width: ${
								padding * 2 + font_size * this.input_min_length
							}px`
						);

						this.$refs.input_max_wrapper.setAttribute(
							"style",
							`width: ${
								padding * 2 + font_size * this.input_max_length
							}px`
						);

						break;
					}
				}
			},
		},
		mounted() {
			this.document_width <= 540
				? this.resizeInputByContent(42.5, 22, "mobile")
				: this.resizeInputByContent(52.5, 30, "pc");
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

		&__horizontal-rule {
			display: block;
			background-color: $white;
			width: 100%;
			height: 0.6rem;
		}

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
				max-width: 82rem;
				gap: 8rem;
				.brief-number-of-positions__horizontal-rule {
					transform: translateY(2rem);
				}
			}
		}

		&__description {
			font-size: 2.4rem;
			line-height: 1.2;
		}

		&__title {
			display: flex;
			text-transform: uppercase;
			font-size: 8.6rem;
			font-weight: 700;
			color: #00b2ef;
			margin-bottom: 2rem;
			gap: 3rem;
			&-and {
				font-size: 8.6rem;
			}
			&-row {
				gap: 3rem;
				&:nth-child(2) {
					display: flex;
					align-items: flex-end;
				}
			}
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
				line-height: 1.2;
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
			text-align: center;

			&-wrapper {
				transition: all 0.2s ease;
				min-width: 14rem;
				&:last-child {
					margin-left: auto;
				}
			}
		}
		.r-button {
			margin: 0 auto;
		}
	}

	@media (max-width: 1023px) {
		.brief-number-of-positions {
			gap: 0;

			&__horizontal-rule {
				display: none;
			}

			&__title {
				gap: 3rem;
				flex-direction: column;
				justify-content: flex-end;
				&-row {
					display: flex;
					margin-left: auto;
				}
				&-and {
					font-size: 5rem;
				}
			}
			&__row {
				&:nth-child(2) {
					margin-top: auto;
				}
				&:nth-child(3) {
					order: -1;
				}
			}

			&__description {
				font-size: 1.8rem;
			}
			&__big-word {
				font-size: 10rem;
			}

			&__subtitle {
				font-size: 2.4rem;
				width: fit-content;
				position: relative;
				line-height: 1.3;
				padding-top: 2rem;
				text-transform: uppercase;
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
					font-size: 3.6rem;
				}
			}

			&__bottom {
				&-row {
					margin-top: 0;
					gap: 3rem;
				}
			}
		}
	}

	@media (max-width: 650px) {
		.brief-number-of-positions {
			&__title {
				&-row {
					&:nth-child(2) {
						width: 100%;
						display: grid;
						grid-template-columns: repeat(2, 1fr);
						.brief-number-of-positions__input-wrapper {
							grid-column: 1/3;
							min-width: 100%;
						}
					}
				}
				&-and {
					margin-left: auto;
				}
			}
		}
	}

	@media (max-width: 540px) {
		.brief-number-of-positions {
			overflow-y: auto !important;
			&__title {
				flex-direction: column;
				width: 100%;
				&-row {
					font-size: 4rem;
				}
			}

			&__big-word {
				font-size: 6rem;
			}

			&__input {
				font-size: 3.5rem;
				padding: 1rem 4rem;
			}

			&__bottom {
				&-row {
					display: flex;
				}
			}
		}
	}
</style>
