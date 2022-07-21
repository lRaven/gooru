<template>
	<div class="rate-info">
		<h3 class="rate-info__name">Израсходовано подписки</h3>

		<div class="rate-info__diagram" ref="progressbar">
			<div class="rate-info__diagram-item">
				<h4 class="rate-info__diagram-counter">
					{{ percentIncrement }}%
				</h4>
			</div>
		</div>

		<div class="rate-info__more">
			<p class="rate-info__more-key">Дата оплаты</p>
			<p class="rate-info__more-value">{{ created_date }}</p>

			<p class="rate-info__more-key">Дата окончания подписки</p>
			<p class="rate-info__more-value">{{ finish_date }}</p>
		</div>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			class="rate-info__progressbar"
			viewBox="0 0 350 350"
		>
			<circle
				cx="175"
				cy="175"
				r="145"
				stroke="#5960c7"
				stroke-width="50px"
				fill="transparent"
				ref="circle"
			/>
		</svg>
	</div>
</template>

<script>
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
				return this.rate.created.split("-").reverse().join(".");
			},
			finish_date() {
				return this.rate.finish_date.split("-").reverse().join(".");
			},

			percent() {
				const start = +new Date(this.rate.created);
				const end = +new Date(this.rate.finish_date);
				const today = +new Date();

				if (this.created_date === this.finish_date) {
					return 100;
				}

				if (start > today) {
					return 0;
				}

				return Math.round(((today - start) / (end - start)) * 100);
			},

			degree() {
				return (this.percent / 100) * 360;
			},

			circleLength() {
				return this.$refs.circle.getTotalLength();
			},
		},
		data: () => ({ percentIncrement: 0, degreeIncrement: 0 }),
		methods: {
			setRateProgress() {
				this.$refs.progressbar.setAttribute(
					"style",
					`background: conic-gradient(#5960c7 ${this.degreeIncrement}deg, #e0e7f0 0deg);`
				);
			},
			animateDegree() {
				let range;

				this.percent > 10 ? (range = 1500) : (range = 300);

				const interval = setInterval(() => {
					this.setRateProgress();
					this.degreeIncrement++;

					if (this.degree < this.degreeIncrement) {
						clearInterval(interval);
					}
				}, range / this.degree);
			},
			animatePercent() {
				let range;

				this.percent > 10 ? (range = 1500) : (range = 300);

				const interval = setInterval(() => {
					this.percentIncrement++;

					if (this.percent <= this.percentIncrement) {
						clearInterval(interval);
					}
				}, range / this.percent);
			},
		},
		mounted() {
			setTimeout(() => {
				if (this.percent > 0) {
					this.animatePercent();
					this.animateDegree();
				}

				this.$refs.circle.setAttribute(
					"style",
					`stroke-dasharray: ${this.circleLength}; stroke-dashoffset: ${this.circleLength};`
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
			width: 35rem;
			height: 35rem;
			border-radius: 50%;
			transition: all 1s ease;
			background: conic-gradient($primary 0deg, rgba($gray, 0.1) 0deg);
			margin-bottom: 4rem;
			&-counter {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 5rem;
				right: 5rem;
				top: 5rem;
				bottom: 5rem;
				background-color: $light-blue;
				border-radius: 50%;
				font-weight: 700;
				color: $primary;
				font-size: 4rem;
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

		&__progressbar {
			height: 35rem;
			width: 35rem;
			circle {
				animation: progress 5s linear forwards;
			}
		}
	}

	@keyframes progress {
		100% {
			stroke-dashoffset: 0;
			background-color: #fff;
		}
	}
</style>
