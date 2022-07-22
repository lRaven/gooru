<template>
	<div class="rate-info">
		<h3 class="rate-info__name">Израсходовано подписки</h3>

		<div class="rate-info__diagram">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				class="rate-info__diagram-svg"
				viewBox="0 0 350 350"
			>
				<circle
					cx="175"
					cy="175"
					r="145"
					stroke="#e0e7f0"
					stroke-width="50px"
					fill="transparent"
					class="rate-info__diagram-bg"
				/>
				<circle
					cx="175"
					cy="175"
					r="145"
					stroke="#5960c7"
					stroke-width="50px"
					fill="transparent"
					ref="progressbar"
					class="rate-info__diagram-progressbar"
				/>
			</svg>
			<h4 class="rate-info__diagram-counter">{{ percentIncrement }}%</h4>
		</div>

		<div class="rate-info__more">
			<p class="rate-info__more-key">Дата оплаты</p>
			<p class="rate-info__more-value">{{ created_date }}</p>

			<p class="rate-info__more-key">Дата окончания подписки</p>
			<p class="rate-info__more-value">{{ finish_date }}</p>
		</div>
	</div>
</template>

<script>
	import { prettyDate } from "@/js/processStrings";

	export default {
		name: "RateInfo",
		props: {
			rate: {
				value: Object,
				required: true,
			},
		},
		computed: {
			created_date() {
				return prettyDate(this.rate.created);
			},
			finish_date() {
				return prettyDate(this.rate.finish_date);
			},

			percent() {
				const start = +new Date(this.rate.created);
				const end = +new Date(this.rate.finish_date);
				const today = +new Date();

				if (new Date() >= new Date(this.rate.finish_date)) {
					return 100;
				}

				return Math.round(((today - start) / (end - start)) * 100);
			},

			circleLength() {
				return this.$refs.progressbar.getTotalLength();
			},
			circleLengthPercent() {
				const percent = this.circleLength / 100;

				return percent * this.percent;
			},
		},
		data: () => ({ percentIncrement: 0 }),
		methods: {
			animatePercent() {
				let range;

				this.percent > 10 ? (range = 2000) : (range = 500);

				const interval = setInterval(() => {
					this.percentIncrement++;

					if (this.percent <= this.percentIncrement) {
						clearInterval(interval);
					}
				}, range / this.percent);
			},
		},
		mounted() {
			//* указываем по дефолту 0%
			this.$refs.progressbar.setAttribute(
				"style",
				`stroke-dasharray: 0,${this.circleLength}; stroke-dashoffset: ${this.circleLengthPercent};`
			);

			setTimeout(() => {
				if (this.percent > 0) {
					this.animatePercent();
				}

				this.$refs.progressbar.setAttribute(
					"style",
					`stroke-linecap: round; stroke-dasharray: ${this.circleLengthPercent},${this.circleLength}; stroke-dashoffset: ${this.circleLengthPercent};`
				);
			}, 300);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.rate-info {
		max-width: 35rem;
		&__name {
			color: $primary;
			text-align: center;
			margin-bottom: 3rem;
			font-weight: 700;
		}

		&__diagram {
			position: relative;
			margin-bottom: 3rem;
			&-counter {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				font-weight: 700;
				color: $primary;
				font-size: 4rem;
			}
			&-bg {
			}
			&-progressbar {
				height: 35rem;
				width: 35rem;
				animation: progress 2s ease forwards;
				transform: rotate(-90deg);
				transform-origin: 50%;
				animation-delay: 0.3s;
			}
		}

		&__more {
			padding: 2rem;
			border-radius: 0.5rem;
			background-color: $white;
			box-shadow: $shadow;
			display: grid;
			grid-template-columns: 16rem max-content;
			justify-content: space-between;
			align-items: center;
			grid-gap: 1rem;
			&-key {
			}
			&-value {
				font-weight: 600;
				color: $primary;
				font-size: 2.4rem;
			}
		}
	}

	@keyframes progress {
		100% {
			stroke-dashoffset: 0;
		}
	}
</style>
